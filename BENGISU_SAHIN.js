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
                    self.setEvents(products);
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

        const productLinks = document.querySelectorAll(".product-item-anchor");
        productLinks.forEach((link) => {
            link.addEventListener("click", function (e) {
                if (!window.isDragging) {
                    return true;
                } else {
                    e.preventDefault();
                    return false;
                }
            });
        });

        let scrollPosition = 0;
        const carousel = document.getElementById("product-carousel");
        if (!carousel) return;

        const owlItems = document.querySelectorAll(".owl-item");
        if (owlItems.length === 0) return;

        const itemWidth =
            owlItems[0].getBoundingClientRect().width +
            parseInt(getComputedStyle(owlItems[0]).marginRight);

        const owlCarousel = document.querySelector(".owl-carousel");
        const stageOuter = document.querySelector(".owl-stage-outer");
        const stageWidth = stageOuter
            ? stageOuter.getBoundingClientRect().width
            : 0;
        const visibleItems = Math.floor(stageWidth / itemWidth);

        const totalItems =
            JSON.parse(localStorage.getItem("ebProductsData") || "[]")?.length || 8;

        const maxScroll = Math.max(0, (totalItems - visibleItems) * itemWidth);

        function animatedScroll(position) {
            carousel.style.transition = "transform 0.5s ease";
            carousel.style.transform = `translateX(-${position}px)`;
        }

        function updateButtonStates() {
            const prevButton = document.getElementById("carousel-prev");
            const nextButton = document.getElementById("carousel-next");

            if (prevButton) {
                if (scrollPosition <= 0) {
                    prevButton.classList.add("disabled");
                } else {
                    prevButton.classList.remove("disabled");
                }
            }

            if (nextButton) {
                if (scrollPosition >= maxScroll) {
                    nextButton.classList.add("disabled");
                } else {
                    nextButton.classList.remove("disabled");
                }
            }

            const swiperPrevButton = document.querySelector(".swiper-prev");
            const swiperNextButton = document.querySelector(".swiper-next");

            if (swiperPrevButton) {
                if (scrollPosition <= 0) {
                    swiperPrevButton.classList.add("disabled");
                } else {
                    swiperPrevButton.classList.remove("disabled");
                }
            }

            if (swiperNextButton) {
                console.log(scrollPosition, maxScroll);
                if (scrollPosition >= maxScroll) {
                    swiperNextButton.classList.add("disabled");
                } else {
                    swiperNextButton.classList.remove("disabled");
                }
            }
        }

        const prevButton = document.getElementById("carousel-prev");
        const nextButton = document.getElementById("carousel-next");

        if (prevButton) {
            prevButton.addEventListener("click", () => {
                if (scrollPosition <= 0) return;

                scrollPosition = Math.max(0, scrollPosition - itemWidth);
                animatedScroll(scrollPosition);
                updateButtonStates();
            });
        }

        if (nextButton) {
            nextButton.addEventListener("click", () => {
                if (scrollPosition >= maxScroll) return;

                scrollPosition = Math.min(maxScroll, scrollPosition + itemWidth);
                animatedScroll(scrollPosition);
                updateButtonStates();
            });
        }

        const swiperPrevButton = document.querySelector(".swiper-prev");
        const swiperNextButton = document.querySelector(".swiper-next");

        if (swiperPrevButton) {
            swiperPrevButton.addEventListener("click", () => {
                if (scrollPosition <= 0) return;

                scrollPosition = Math.max(0, scrollPosition - itemWidth);
                animatedScroll(scrollPosition);
                updateButtonStates();
            });
        }

        if (swiperNextButton) {
            swiperNextButton.addEventListener("click", () => {
                if (scrollPosition >= maxScroll) return;

                scrollPosition = Math.min(maxScroll, scrollPosition + itemWidth);
                animatedScroll(scrollPosition);
                updateButtonStates();
            });
        }

        window.isDragging = false;
        let startX = 0;
        let startScrollPosition = 0;
        let moveThreshold = 5;
        let hasMoved = false;

        owlCarousel.addEventListener("mousedown", (e) => {
            if (
                e.target.closest("button") ||
                e.target.closest("eb-add-to-wish-list a")
            ) {
                return;
            }

            window.isDragging = true;
            startX = e.clientX;
            startScrollPosition = scrollPosition;
            owlCarousel.style.cursor = "grabbing";
            hasMoved = false;

            e.preventDefault();
        });

        document.addEventListener("mousemove", (e) => {
            if (!window.isDragging) return;

            const deltaX = e.clientX - startX;

            if (Math.abs(deltaX) > moveThreshold) {
                hasMoved = true;
            }

            if (hasMoved) {
                let newPosition = startScrollPosition - deltaX;

                newPosition = Math.max(0, Math.min(maxScroll, newPosition));

                carousel.style.transition = "none";
                carousel.style.transform = `translateX(-${newPosition}px)`;
            }
        });

        document.addEventListener("mouseup", (e) => {
            if (!window.isDragging) return;

            if (!hasMoved) {
                const clickedItem = e.target.closest(".product-item-anchor");
                if (clickedItem && clickedItem.href) {
                    window.open(clickedItem.href, "_blank");
                }
            } else {
                const transformMatrix = new DOMMatrix(
                    getComputedStyle(carousel).transform
                );
                const currentPosition = -transformMatrix.m41;

                scrollPosition = Math.round(currentPosition / itemWidth) * itemWidth;

                scrollPosition = Math.max(0, Math.min(maxScroll, scrollPosition));

                animatedScroll(scrollPosition);
                updateButtonStates();
            }

            window.isDragging = false;
            hasMoved = false;
            owlCarousel.style.cursor = "grab";
        });

        const images = owlCarousel.querySelectorAll("img");
        images.forEach((img) => {
            img.addEventListener("dragstart", (e) => {
                e.preventDefault();
            });
        });

        updateButtonStates();

        window.addEventListener("resize", () => {
            if (!carousel) return;

            const owlItems = document.querySelectorAll(".owl-item");
            if (owlItems.length === 0) return;

            const itemWidth =
                owlItems[0].getBoundingClientRect().width +
                parseInt(getComputedStyle(owlItems[0]).marginRight);

            const stageOuter = document.querySelector(".owl-stage-outer");
            const stageWidth = stageOuter
                ? stageOuter.getBoundingClientRect().width
                : 0;
            const visibleItems = Math.floor(stageWidth / itemWidth);

            const totalItems = owlItems.length;
            const newMaxScroll = 8 * itemWidth;
            console.log(newMaxScroll);

            if (scrollPosition > newMaxScroll) {
                scrollPosition = newMaxScroll;
                animatedScroll(scrollPosition);
            }

            maxScroll = newMaxScroll;

            updateButtonStates();
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
