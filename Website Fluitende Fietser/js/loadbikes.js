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

// let shoppingcart = sessionStorage.getItem('shopping-cart') || [];
let shoppingcart = JSON.parse(sessionStorage.getItem('shopping-cart')) || [];

function ToggleShoppingCart() {
    if (doc("shopping-cart-container").style.left === '100%') {
        OpenShoppingCart();
    } else {
        CloseShoppingCart();
    }
}

function OpenShoppingCart() {
    doc("shopping-cart-container").style.left = '75%';
    doc("open-shopping-cart").style.setProperty('--font-weight-before', '600');
}
function CloseShoppingCart() {
    doc("shopping-cart-container").style.left = '100%';
    doc("open-shopping-cart").style.setProperty('--font-weight-before', '500');
}

function CreateItemInShoppingCart(Bikename, bikeprice, updatesession = true) {
    const newitem = document.createElement('div');
    newitem.classList.add("shopping-cart-item", "adding");
    const newimg = document.createElement('img');
    const formattedBikeName = Bikename.split(' ').join('_');
    newimg.src = `images/fietsen/${formattedBikeName}.jpg`;;

    const infodiv = document.createElement('div');
    infodiv.classList.add("shopping-cart-item-info", "flex");

    const newnameh3 = document.createElement('h3');
    newnameh3.innerHTML = Bikename;
    const newprice = document.createElement('label');
    newprice.innerHTML = bikeprice;

    const btnspacer = document.createElement('div');
    btnspacer.classList.add("flex-spacer");

    const removebtn = document.createElement('button');
    removebtn.setAttribute("data-icon", "");
    removebtn.classList.add("shopping-cart-remove-button", "icon");
    removebtn.addEventListener('click', () => {
        newitem.classList.add('removing');
        newitem.addEventListener("animationend", (event) => {
            if (event.animationName === "removeItem") {
                newitem.remove();
                const index = shoppingcart.findIndex(item => item.Bikename === Bikename);
                shoppingcart.splice(index, 1);
                sessionStorage.setItem("shopping-cart", JSON.stringify(shoppingcart));
                AddPriceToTotal(true);
            }
        })
    });

    newitem.appendChild(newimg);
    newitem.appendChild(infodiv);
    newitem.appendChild(btnspacer);
    newitem.appendChild(removebtn);
    infodiv.appendChild(newnameh3);
    infodiv.appendChild(newprice);
    doc("shopping-cart-items").appendChild(newitem);

    newitem.addEventListener("animationend", (event) => {
        if (event.animationName === "addItem") {
            newitem.classList.remove("adding");
        }
    });
    
    if (updatesession) {
        const replacetext = bikeprice.replace(',', '.').replace('Prijs: €', '');
        const newbikeprice = parseFloat(replacetext).toFixed(2);
        console.log(replacetext, newbikeprice);
        const elementt = newitem.outerHTML;
        shoppingcart.push({Bikename, newbikeprice, elementt});
        sessionStorage.setItem("shopping-cart", JSON.stringify(shoppingcart));
        console.log(shoppingcart);
    }
}

function AddPriceToTotal(deleteitem = false) {
    let itemcount = 0;
    let total = 0;
    shoppingcart.forEach(item => {
        total += Number(item.newbikeprice);
        itemcount++;
    });
    console.log(total);
    doc("shopping-cart-total-price").innerHTML = `Totaal: €${total.toFixed(2).replace('.', ',')}`;
    if (total > 0) {
        doc("open-shopping-cart").setAttribute("item-count", itemcount);
        doc("open-shopping-cart").classList.add("show-item-count");
        if (deleteitem === false) {
            doc("open-shopping-cart").classList.add("countUp");
            doc("open-shopping-cart").addEventListener("animationend", () => {
                doc("open-shopping-cart").classList.remove("countUp");
            });
        }
    } else {
        doc("open-shopping-cart").setAttribute("item-count", itemcount);
        doc("open-shopping-cart").classList.remove("show-item-count");
    }
}

function addToCart() {
    const bikename = doc("bike-name").innerHTML;
    const bikeprice = doc("bike-price").innerHTML;
    CreateItemInShoppingCart(bikename, bikeprice);
    AddPriceToTotal();
    OpenShoppingCart();
}

function LoadShoppingCart() {
    shoppingcart.forEach(item => {
        const pricelabeltext = `Prijs: €${(item.newbikeprice).replace('.', ',')}`;
        CreateItemInShoppingCart(item.Bikename, pricelabeltext, false);
    });
    AddPriceToTotal();
}

document.addEventListener("DOMContentLoaded", () => {
    doc("shopping-cart-container").style.left = '100%';
    LoadBikes();
    LoadShoppingCart();
    doc("close-bigger-bike").addEventListener('click', CloseBikeInfo);
});