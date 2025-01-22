// const doc = document.getElementById.bind(document);
function LoadBikes() {
    fetch("assets/fietsen.txt")
    .then((respnse) => respnse.text())
    .then((text) => {
        const bikes = text.split("\n");
        for (const bike of bikes) {
            const [number, bikename, drivetype, driveoffer, bikegender, biketype, bikebrand, isnew, bikecolor, bikeprice, bikecommentary] = bike.split(":");
            console.log(`bikename: ${bikename}, drivetype: ${drivetype}, driveoffer: ${driveoffer}, bikegender: ${bikegender}, biketype: ${biketype}, bikebrand: ${bikebrand}, isnew: ${isnew}, bikecolor: ${bikecolor}, bikeprice: ${bikeprice}, bikecommentary: ${bikecommentary}`);
            // Pelikaan Carry On Lady : elektrisch : geschikt voor zakelijk en prive : dames : transport : Pelikaan : nieuw : zwart : 769,00 : 28 Inch 53 cm 3V V-Brakes
            const button = addBike(bikename);
            button.addEventListener('click', () => {
                console.log('Button clicked:');
                OpenBikeInfo(bikename, bikebrand, bikeprice, biketype, bikecolor, bikegender, driveoffer, isnew, null, bikecommentary);
            });
        }
    })
    .catch((e) => console.error(e));
}


function OpenBikeInfo(bikename, bikebrand, bikeprice, biketype, bikecolor, bikegender, driveoffer, isnew, bikecode, bikecommentary) {
    doc("shop-container").style.display = 'none';
    doc("bigger-bike-container").style.display = 'grid';
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
}
function CloseBikeInfo() {
    doc("shop-container").style.display = 'grid';
    doc("bigger-bike-container").style.display = 'none';
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
    // doc("shop-container").children[0].remove();
    doc("shop-container").lastElementChild.remove();
}

let shoppingcart = localStorage.getItem("shopping-cart") || [];

function OpenShoppingCart() {
    doc("shopping-cart-container").style.left = '75%';
}
function CloseShoppingCart() {
    doc("shopping-cart-container").style.left = '100%';
}

function CreateItemInShoppingCart(Bikename, bikeprice) {
    const newitem = document.createElement('div');
    newitem.classList.add("shopping-cart-item");
    const newimg = document.createElement('img');
    const formattedBikeName = Bikename.split(' ').join('_');
    newimg.src = `images/fietsen/${formattedBikeName}.jpg`;;

    const infodiv = document.createElement('div');
    infodiv.classList.add("shopping-cart-item-info", "flex");

    const newnameh3 = document.createElement('h3');
    newnameh3.innerHTML = Bikename;
    const newprice = document.createElement('label');
    newprice.innerHTML = bikeprice;
    newitem.appendChild(newimg);
    newitem.appendChild(infodiv);
    infodiv.appendChild(newnameh3);
    infodiv.appendChild(newprice);
    doc("shopping-cart-items").appendChild(newitem);
    
    const newbikeprice = parseFloat(price.replace(/[^\d\.]*/g, ''));
    shoppingcart.push({Bikename, newbikeprice});
    console.log(shoppingcart);
}

function AddPriceToTotal(price) {
   const currenttotal = doc("total-price").innerHTML
//    const currenttotalnum = parseFloat(currenttotal.split('€')[1]);
    const currenttotalnum = localStorage.getItem("Total-price-Shopping-cart") || 0;
   const pricenum = parseFloat(price.split('€')[1]);
   console.log(pricenum, currenttotalnum, parseFloat(pricenum), parseFloat(currenttotalnum));
   doc("total-price").innerHTML = `Totaal: ${parseFloat(currenttotalnum) + parseFloat(pricenum)}`;
   localStorage.setItem("Total-price-Shopping-cart", currenttotalnum + pricenum);
}

function addToCart() {
    const bikename = doc("bike-name").innerHTML;
    const bikeprice = doc("bike-price").innerHTML;
    CreateItemInShoppingCart(bikename, bikeprice);
    AddPriceToTotal(bikeprice);
    OpenShoppingCart();
}

document.addEventListener("DOMContentLoaded", () => {
    LoadBikes();
    doc("close-bigger-bike").addEventListener('click', CloseBikeInfo);
});