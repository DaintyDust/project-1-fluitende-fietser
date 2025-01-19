let slides = null;
let slidebuttons = null;
let slideIndex = 0;
let intervalId = null;

document.addEventListener("DOMContentLoaded", () => {
    CreateBikeSlide();
});

function CreateBikeSlide() {
    fetch("assets/fietsen.txt")
    .then((respnse) => respnse.text())
    .then((text) => {
        const bikes = text.split("\n");
        for (const bike of bikes) {
            const [number, bikename, drivetype, driveoffer, bikegender, biketype, bikebrand, isnew, bikecolor, bikeprice, bikecommentary] = bike.split(":");
           
            const sliding_image_item = document.createElement('div');
            sliding_image_item.classList.add("sliding-image-item");
            const sliding_image = document.createElement('img');
            sliding_image.classList.add("sliding-image");
            sliding_image.src = `images/fietsen/${bikename}.jpg`;
            const span = document.createElement('span');
            span.innerHTML = bikename;
            sliding_image_item.appendChild(sliding_image);
            sliding_image_item.appendChild(span);
            doc("sliding-images-items").appendChild(sliding_image_item);

            const page_number = document.createElement('div');
            page_number.setAttribute("data-current","false");
            doc("sliding-page-number").appendChild(page_number);

            page_number.addEventListener('click', () => {
                clearInterval(intervalId);
                slideIndex = bikes.indexOf(bike);
                showSlide(slideIndex);
            });

        }
        slides = document.querySelectorAll(".sliding-image-item")
        slidebuttons = document.querySelectorAll("#sliding-page-number div");
        console.log(slides);
        console.log(slidebuttons);
        initializeSlider();
    })
    .catch((e) => console.error(e));
}

function initializeSlider() {
    if(slides.length > 0) {
        slides[slideIndex].classList.add("display-sliding-image");
        slidebuttons[slideIndex].setAttribute("data-current","true");
        intervalId = setInterval(nextSlide, 5000);
    }
}

function showSlide(index) {

    if(index >= slides.length) {
        slideIndex = 0;
    } else if(index < 0) {
        slideIndex = slides.length - 1;
    }

    slides.forEach((slide) => {
        slide.classList.remove("display-sliding-image");
    });
    slidebuttons.forEach((button) => {
        button.setAttribute("data-current","false");
    });
    slides[slideIndex].classList.add("display-sliding-image");
    slidebuttons[slideIndex].setAttribute("data-current","true"); 
}

function nextSlide() {
    slideIndex++;
    showSlide(slideIndex);
}

function previousSlide() {
    clearInterval(intervalId);
    slideIndex--;
    showSlide(slideIndex);
}
