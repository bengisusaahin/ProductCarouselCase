(() => {
    const init = () => {

        if (!isHomePage()) {
            console.log("wrong page");
            return;
        }

        const savedProducts = localStorage.getItem("ebProductsData");
        const favorites = JSON.parse(localStorage.getItem("ebFavorites")) || [];

        if (savedProducts) {
            const products = JSON.parse(savedProducts);
            self.buildHTML();
            self.buildCSS();
            self.renderProducts(products, favorites);
            self.setEvents();
        } else {
            fetch(
                "https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json"
            )
                .then((response) => response.json())
                .then((products) => {
                    localStorage.setItem("ebProductsData", JSON.stringify(products));

                    self.buildHTML();
                    self.buildCSS();
                    self.renderProducts(products, favorites);
                })
                .catch((error) => {
                    console.error("Error fetching products:", error);
                });
        }
    };

    const buildHTML = () => {
        const html = `
            <eb-product-carousel>
                <div class="banner">
                    <div class="container">
                        <eb-carousel-header class="ng-star-inserted">
                            <div class="banner__titles">
                                <h2 class="title-primary">Beğenebileceğinizi düşündüklerimiz</h2>
                            </div>
                        </eb-carousel-header>
                        <div class="banner__wrapper ng-star-inserted">
                            <div>
                                <owl-carousel-o class="product-list__best-products">
                                    <div class="owl-carousel owl-theme owl-loaded owl-responsive owl-drag">
                                        <div class="owl-stage-outer ng-star-inserted">
                                            <div class="ng-tns-c125-3">
                                                <div class="owl-stage" id="product-carousel" style="width: 4751px; transform: translate3d(0px, 0px, 0px); transition: all 0.5s ease;">
                                                    <!-- Products will be rendered here -->
                                                </div>
                                            </div>
                                        </div>
                                        <div class="owl-nav disabled ng-star-inserted">
                                            <div class="owl-prev" id="carousel-prev"><i class="icon icon-prev"></i></div>
                                            <div class="owl-next" id="carousel-next"><i class="icon icon-next"></i></div>
                                        </div>
                                    </div>
                                </owl-carousel-o>
                                <button aria-label="back" class="swiper-prev"></button>
                                <button aria-label="next" class="swiper-next"></button>
                            </div>
                        </div>
                    </div>
                </div>
            </eb-product-carousel>
        `;

        const section2A = document.querySelector("cx-page-slot.Section2A");
        if (section2A) {
            section2A.insertAdjacentHTML("afterbegin", html);
        }
    };


    const buildCSS = () => {
        const style = document.createElement("style");
        style.innerHTML = `
            .heart-icon.hovered {
                display: none;
            }
            .heart:hover .heart-icon {
                display: none;
            }
            .heart:hover .heart-icon.hovered {
                display: inline-block;
            }
            .owl-carousel {
                cursor: grab;
            }
            .owl-carousel:active {
                cursor: grabbing;
            }
            .disabled {
                opacity: 0.5;
                cursor: default !important;
                pointer-events: none;
            }
            .owl-item img {
                pointer-events: none; 
            }
            .owl-item a {
                pointer-events: auto; 
            }
            .owl-stage {
                touch-action: pan-y; 
            }
            .eb-add-to-wish-list a {
                z-index: 10; 
                position: relative;
            }
        `;
        document.head.appendChild(style);
    };

    const renderProducts = (products, favorites) => {
        const carousel = document.getElementById("product-carousel");
        let productsHTML = "";

        products.forEach((product) => {
            const isFavorite = favorites.includes(product.id);
            const discountPercentage =
                product.original_price > product.price
                    ? Math.round(
                        ((product.original_price - product.price) /
                            product.original_price) *
                        100
                    )
                    : 0;

            productsHTML += `
                <div class="owl-item ng-tns-c125-3 ng-trigger ng-trigger-autoHeight active ng-star-inserted" style="width: 296.667px; margin-right: 20px;">
                    <div class="ins-web-smart-recommender-box-item ng-star-inserted">
                        <div event-collection="true" class="ins-product-box ins-element-link ins-add-to-cart-wrapper ins-sr-api" ins-product-id="${product.id
                }">
                            <eb-carousel-product-item class="ng-star-inserted">
                                <div class="product-item">
                                    <eb-generic-link class="product-item-anchor" event-collection="true">
                                        <a class="product-item-anchor ng-star-inserted" href="${product.url
                }" target="_blank">
                                            <figure class="product-item__img ng-star-inserted">
                                                <span class="d-flex flex-column align-items-start justify-content-end position-absolute bottom-0">
                                                    <eb-new-product-badge class="mb-3"></eb-new-product-badge>
                                                </span>
                                                <cx-media alt="Popular" format="product" class="is-initialized">
                                                    <img class="ng-star-inserted ls-is-cached lazyloaded" alt="${product.name
                }" src="${product.img}">
                                                </cx-media>
                                                <div class="d-flex ml-4"></div>
                                            </figure>
                                            <div class="product-item-content ng-star-inserted">
                                                <eb-generic-link class="product-item-anchor">
                                                    <a class="product-item-anchor ng-star-inserted" href="${product.url}">
                                                        <h2 class="product-item__brand ng-star-inserted">
                                                            <b>${product.brand} - </b>
                                                            <span>${product.name}</span>
                                                        </h2>
                                                    </a>
                                                </eb-generic-link>
                                                <div class="product-item__price">
                                                    ${product.original_price > product.price
                    ? `<div class="d-flex align-items-center ng-star-inserted">
                                                                <span class="product-item__old-price ng-star-inserted">${product.original_price.toFixed(2)} TL</span>
                                                                <span class="product-item__percent carousel-product-price-percent ml-2 ng-star-inserted">%${discountPercentage} <i class="icon icon-decrease"></i></span>
                                                            </div>
                                                            <span class="product-item__new-price discount-product ng-star-inserted">${product.price.toFixed(2)} TL</span>`
                    : `<span class="product-item__new-price ng-star-inserted">${product.price.toFixed(2)} TL</span>`
                }
                                                </div>
                                            </div>
                                            <div class="product-list-promo ng-star-inserted"></div>
                                        </a>
                                    </eb-generic-link>
                                    <eb-add-to-wish-list>
                      <a href="javascript:void(0)" class="ng-star-inserted" data-product-id="${product.id
                }">
                        <div class="heart ng-star-inserted">
                          ${isFavorite
                    ? `<img src="assets/svg/added-favorite.svg" alt="heart fill" class="heart-icon">
                             <img src="assets/svg/added-favorite-hover.svg" alt="heart fill" class="heart-icon hovered">`
                    : `<img id="default-favorite" src="assets/svg/default-favorite.svg" alt="heart" class="heart-icon">
                             <img src="assets/svg/default-hover-favorite.svg" alt="heart" class="heart-icon hovered">`
                }
                          <div class="toolbox">
                            <div class="toolbox-triangle"></div>
                            <span>Listelerimi güncelle</span>
                          </div>
                        </div>
                      </a>
                    </eb-add-to-wish-list>
                                    <div class="product-item-content">
                                        <div class="product-item__price">
                                            <div class="ins-add-to-cart-wrapper" ins-product-id="${product.id}">
                                                <eb-add-to-cart buttonclass="close-btn">
                                                    <form novalidate="" class="ng-untouched ng-pristine ng-valid ng-star-inserted">
                                                        <button id="addToCartBtn" type="submit" class="btn close-btn disable ng-star-inserted">Sepete Ekle</button>
                                                    </form>
                                                </eb-add-to-cart>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </eb-carousel-product-item>
                        </div>
                    </div>
                </div>
            `;
        });

        if (carousel) {
            carousel.innerHTML = productsHTML;
        }
    };

    const setEvents = (products) => {
        const hearts = document.querySelectorAll("eb-add-to-wish-list a");
        hearts.forEach((heart) => {
            heart.addEventListener("click", function (e) {
                e.preventDefault();
                e.stopPropagation();

                const productId = parseInt(this.getAttribute("data-product-id"));
                const favorites = JSON.parse(localStorage.getItem("ebFavorites")) || [];

                const index = favorites.indexOf(productId);
                const heartContainer = this.querySelector(".heart");

                if (index === -1) {
                    favorites.push(productId);

                    heartContainer.innerHTML = `
              <img src="assets/svg/added-favorite.svg" alt="heart fill" class="heart-icon">
              <img src="assets/svg/added-favorite-hover.svg" alt="heart fill" class="heart-icon hovered">
              <div class="toolbox">
                <div class="toolbox-triangle"></div>
                <span>Listelerimi güncelle</span>
              </div>
            `;
                } else {
                    favorites.splice(index, 1);

                    heartContainer.innerHTML = `
              <img id="default-favorite" src="assets/svg/default-favorite.svg" alt="heart" class="heart-icon">
              <img src="assets/svg/default-hover-favorite.svg" alt="heart" class="heart-icon hovered">
              <div class="toolbox">
                <div class="toolbox-triangle"></div>
                <span>Listelerimi güncelle</span>
              </div>
            `;
                }

                localStorage.setItem("ebFavorites", JSON.stringify(favorites));
            });
        });
    };

    const self = {
        buildHTML,
        buildCSS,
        renderProducts,
        setEvents,
    };

    const isHomePage = () =>
        window.location.pathname === "/" || window.location.pathname === "/index.html";

    init();
})();
