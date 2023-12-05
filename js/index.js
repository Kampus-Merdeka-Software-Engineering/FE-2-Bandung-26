const API_URL = "https://capstone-be-icanq-production.up.railway.app";

document.addEventListener("DOMContentLoaded", async () => {
    if (window.location.pathname.includes("product.html")) {
        await fetchAllProducts();
    } else if (window.location.pathname.includes("catalog.html")) {
        await setupCatalogPage();
    }
});
