let slides = null;
let slidebuttons = null;
let slideIndex = 0;
let intervalId = null;

document.addEventListener("DOMContentLoaded", () => {
    CreateBikeSlide();
    LoadHomePageText();
    LoadOpenTimes();
});

function LoadHomePageText() {
    fetch("assets/homepage-text.txt")
    .then((respnse) => respnse.text())
    .then((text) => {
        const texts = text.split("\n");
        for (const linetext of texts) {
            const newp = document.createElement('p');
            const newspan = document.createElement('span');
            newspan.innerHTML = linetext;
            newp.appendChild(newspan);
            doc("homepage-text-container").appendChild(newp);
        }
    })
    .catch((e) => console.error(e));
}

function CheckStoreOpen() {
    const date = new Date();
    const day = date.getDay();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    console.log(`day: ${day}, time: ${time}`);
    fetch("assets/opening-hours.txt")
    .then((respnse) => respnse.text())
    .then((text) => {
        const texts = text.split("\n");
        for (const opentimesperday of texts) {
            const [dayname, opentime, closetime] = opentimesperday.split(",");
            if (dayname === day) {
                if (opentime === "gesloten") {
                    doc("store-closed").style.display = 'block';
                } else {
                    if (time >= opentime && time < closetime) {
                        doc("store-open").style.display = 'block';
                    } else {
                        doc("store-closed").style.display = 'block';
                    }
                }
            }
        }
    })
    .catch((e) => console.error(e));
}

function LoadOpenTimes() {
    const weekdays = ["Zondag","Maandag","Dinsdag","Woensdag","Donderdag","Vrijdag","Zaterdag"];
    const date = new Date();
    const dayname = date.getDay();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    // console.log(date);
    console.log(weekdays[dayname]);
    console.log(time);
    fetch("assets/opening-hours.txt")
    .then((respnse) => respnse.text())
    .then((text) => {
        const texts = text.split("\n");
        for (const opentimesperday of texts) {
            const [day, opentime, closetime] = opentimesperday.split(",");

            const div = document.createElement('div');
            div.classList.add("opening-hours-item");
            const dayspan = document.createElement('span');
            dayspan.innerHTML = `${day}:`;
            const timespan = document.createElement('span');
            if (opentime === "gesloten") {
                timespan.classList.add("store-closed-text");
                timespan.innerHTML = `${opentime}`;
            } else {
                timespan.innerHTML = `${opentime} - ${closetime}`;
            }
            div.appendChild(dayspan);
            div.appendChild(timespan);
            doc("homepage-opening-hours").appendChild(div);
            // console.log(day, weekdays[dayname]);
            if (day === weekdays[dayname]) {
                if (opentime === "gesloten") {
                    doc("opening-times-display").classList.add("store-closed");
                    doc("homepage-opening-text").innerHTML = "Gesloten";
                    console.log("closed");
                } else {
                    console.log(time >= opentime, time <= closetime)
                    console.log(opentime, closetime);
                    console.log(time);
                    if (time >= opentime && time <= closetime) {
                        doc("opening-times-display").classList.remove("store-closed");
                        doc("homepage-opening-text").innerHTML = "Open";
                        console.log("open");
                    } else {
                        doc("opening-times-display").classList.add("store-closed");
                        doc("homepage-opening-text").innerHTML = "Gesloten";
                        console.log("closed");
                    }
                }
            }
        }
    })
    .catch((e) => console.error(e));
}

function CreateBikeSlide() {
    const images = ["sfeer2.jpg", "sfeer3.jpg", "verhuur1.jpg", "winkel1.jpg", "winkel2.jpg"];
    let currentindex = 0;

    images.forEach((filename) => {
        const href = `images/homepage_sycle/${filename}`;

        const sliding_image_item = document.createElement('div');
        sliding_image_item.classList.add("sliding-image-item");
        sliding_image_item.setAttribute("data-number", currentindex);

        const sliding_image = document.createElement('img');
        sliding_image.classList.add("sliding-image");
        sliding_image.src = href;
        sliding_image_item.appendChild(sliding_image);

        doc("sliding-images-items").appendChild(sliding_image_item);

        const page_number = document.createElement('div');
        page_number.setAttribute("data-current", "false");
        doc("sliding-page-number").appendChild(page_number);

        page_number.addEventListener('click', () => {
            slideIndex = sliding_image_item.getAttribute("data-number");
            showSlide(slideIndex);
        });

        currentindex++;
    });

    slides = document.querySelectorAll(".sliding-image-item");
    slidebuttons = document.querySelectorAll("#sliding-page-number div");

    initializeSlider();
}

// function CreateBikeSlide() { 
//     const images = ["sfeer2.jpg", "sfeer3.jpg", "verhuur1.jpg", "winkel1.jpg", "winkel2.jpg"];
//     fetch('images/homepage_sycle/')
//     .then(response => response.text())
//     .then(html => {
//         const parser = new DOMParser();
//         const links = parser.parseFromString(html, 'text/html').querySelectorAll('a');
//         let currentindex = 0;
//         links.forEach((link) => {
//             const href = link.getAttribute('href');
//             if (href.endsWith('.jpg') || href.endsWith('.png') || href.endsWith('.gif')) { 
//                 const sliding_image_item = document.createElement('div');
//                 sliding_image_item.classList.add("sliding-image-item");
//                 sliding_image_item.setAttribute("data-number",currentindex);
//                 const sliding_image = document.createElement('img');
//                 sliding_image.classList.add("sliding-image");
//                 sliding_image.src = href;
//                 sliding_image_item.appendChild(sliding_image);
//                 doc("sliding-images-items").appendChild(sliding_image_item);
                
//                 const page_number = document.createElement('div');
//                 page_number.setAttribute("data-current","false");
//                 doc("sliding-page-number").appendChild(page_number);

//                 page_number.addEventListener('click', () => {
//                     slideIndex = sliding_image_item.getAttribute("data-number");
//                     console.log(slideIndex);
//                     showSlide(slideIndex);
//                 });
//                 currentindex++;         
//             }
//         });
//             slides = document.querySelectorAll(".sliding-image-item")
//             slidebuttons = document.querySelectorAll("#sliding-page-number div");
//             // console.log(slides);
//             // console.log(slidebuttons);
//             initializeSlider();
//     })
//     .catch(error => console.error('Error fetching directory listing:', error));
// }

function initializeSlider() {
    if(slides.length > 0) {
        slidebuttons[slideIndex].setAttribute("data-current","true");
        intervalId = setInterval(nextSlide, 5000);
    }
}

function showSlide(index) {
    const sliding_images_items = doc("sliding-images-items");
    if(index >= slides.length) {
        slideIndex = 0;
    } else if(index < 0) {
        slideIndex = slides.length - 1;
    }
    slides.forEach((slide, i) => {
        sliding_images_items.style.transform = `translateX(-${slideIndex * 100}%)`;
    });
    slidebuttons.forEach((button) => {
        button.setAttribute("data-current","false");
    });
    slidebuttons[slideIndex].setAttribute("data-current","true"); 
}

function ResetTimer() {
    clearInterval(intervalId);
    intervalId = setInterval(nextSlide, 5000);
}

function nextSlide(pressedbtn) {
    if (pressedbtn) {ResetTimer();}
    slideIndex++;
    showSlide(slideIndex);
}

function previousSlide(pressedbtn) {
    if (pressedbtn) {ResetTimer();}
    slideIndex--;
    showSlide(slideIndex);
}
