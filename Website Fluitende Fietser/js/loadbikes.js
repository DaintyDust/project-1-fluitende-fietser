// const doc = document.getElementById.bind(document);
function LoadBikes() {
    fetch("assets/fietsen.txt")
    .then((respnse) => respnse.text())
    .then((text) => {
        const bikes = text.split("\n");
        for (const bike of bikes) {
            const [number, bikename, drivetype, driveoffer, bikegender, biketype, bikebrand, isnew, bikecolor, bikeprice, bikecommentary] = bike.split(":");
            //console.log(`bikename: ${bikename}, drivetype: ${drivetype}, driveoffer: ${driveoffer}, bikegender: ${bikegender}, biketype: ${biketype}, bikebrand: ${bikebrand}, isnew: ${isnew}, bikecolor: ${bikecolor}, bikeprice: ${bikeprice}, bikecommentary: ${bikecommentary}`);
            // Pelikaan Carry On Lady : elektrisch : geschikt voor zakelijk en prive : dames : transport : Pelikaan : nieuw : zwart : 769,00 : 28 Inch 53 cm 3V V-Brakes
            const button = addBike(bikename);
            button.addEventListener('click', () => {
                OpenBikeInfo(bikename, bikebrand, bikeprice, biketype, bikecolor, bikegender, driveoffer, isnew, null, bikecommentary);
            });
        }
    })
    .catch((e) => console.error(e));
}


function OpenBikeInfo(bikename, bikebrand, bikeprice, biketype, bikecolor, bikegender, driveoffer, isnew, bikecode, bikecommentary) {
    doc("bike-name").innerHTML = bikename;
    doc("bike-brand").innerHTML = `Merk: ${bikebrand}`;
    doc("bike-price").innerHTML = `Prijs: €${bikeprice}`;
    doc("bike-type").innerHTML = `Type: ${biketype}`;
    doc("bike-color").innerHTML = `Kleur: ${bikecolor}`
    doc("bike-gender").innerHTML = `Frametype: ${bikegender}`;
    doc("bike-offer").innerHTML = `Offer: ${driveoffer}`;
    doc("bike-hand").innerHTML = `Status: ${isnew}`;
    doc("bike-code").innerHTML = `Bikecode: ${bikecode}`;
    doc("bike-commentary").innerHTML = `Opmerking: ${bikecommentary}`;
    const formattedBikeName = bikename.split(' ').join('_');
    doc("bigger-bike-image").src = `images/fietsen/${formattedBikeName}.jpg`;


    doc("shop-container").style.display = 'none';
    doc("bigger-bike-container").style.display = 'grid';
    setTimeout(() => {
        doc("bigger-bike-container").classList.add('opened');
    }, 10);
}
function CloseBikeInfo() {
    doc("bigger-bike-container").classList.remove('opened');
    setTimeout(() => {
        doc("shop-container").style.display = 'grid';
        doc("bigger-bike-container").style.display = 'none';
    }, 200);
}

function addBike(bikename) {
    const newbtn = document.createElement('button');
    newbtn.classList.add("shop-button");
    const newimg = document.createElement('img');
    const formattedBikeName = bikename.split(' ').join('_');
    newimg.src = `images/fietsen/${formattedBikeName}.jpg`;
    const newlabel = document.createElement('label');
    newlabel.innerHTML = bikename;
    
    newbtn.appendChild(newimg);
    newbtn.appendChild(newlabel);
    doc("shop-container").appendChild(newbtn);
    return newbtn;
}

function add() {
    const newbtn = document.createElement('button');
    newbtn.classList.add("shop-button");
    const newimg = document.createElement('img');
    newimg.src = "images/fietsen/Allegra_voorwielmotor.jpg";
    const newlabel = document.createElement('label');
    newlabel.innerHTML = "Stella Allegra voorwielmoter";
    
    newbtn.appendChild(newimg);
    newbtn.appendChild(newlabel);
    doc("shop-container").appendChild(newbtn);
}

function remove() {
    doc("shop-container").lastElementChild.remove();
}

document.addEventListener("DOMContentLoaded", () => {
    doc("shopping-cart-container").style.left = '100%';
    LoadBikes();
    doc("close-bigger-bike").addEventListener('click', CloseBikeInfo);
});