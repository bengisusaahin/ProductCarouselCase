(() => {
    const init = () => {
  
      if (!isHomePage()) {
        console.log("wrong page");
        return;
    }
  
      const savedProducts = localStorage.getItem("ebProductsData");
  
      if (savedProducts) {
        const products = JSON.parse(savedProducts);
      } else {
        fetch(
          "https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json"
        )
          .then((response) => response.json())
          .then((products) => {
            localStorage.setItem("ebProductsData", JSON.stringify(products));
          })
          .catch((error) => {
            console.error("Error fetching products:", error);
          });
      }
    };
  
    const isHomePage = () =>
      window.location.pathname === "/" || window.location.pathname === "/index.html";
  
    init();
  })();
  