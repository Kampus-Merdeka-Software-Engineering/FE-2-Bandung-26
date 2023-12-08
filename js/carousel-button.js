document.addEventListener("DOMContentLoaded", function () {
    const carouselContainer = document.querySelector(".carousel-container");
    const carousel = carouselContainer.querySelector(".carousel");
    const btnLeft = carouselContainer.querySelector(".carousel-button.left");
    const btnRight = carouselContainer.querySelector(".carousel-button.right");

    btnLeft.addEventListener("click", function () {
        carousel.scrollBy({ left: -carousel.offsetWidth, behavior: "smooth" });
    });

    btnRight.addEventListener("click", function () {
        carousel.scrollBy({ left: carousel.offsetWidth, behavior: "smooth" });
    });
});
