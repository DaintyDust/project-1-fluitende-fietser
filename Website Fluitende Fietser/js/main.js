const doc = document.getElementById.bind(document);
const SearchBtnMode = true;

function SearchBikes() {
    const search = doc("search").value.toLowerCase();
    
    var children = doc("shop-container").children;
    for (var i = 0; i < children.length; i++) {
        var child = children[i];
        const isVisible = child.innerText.toLowerCase().includes(search);
        child.classList.toggle('hidden', !isVisible);
    }
}

function UpdateSearchDropdown() {
    const search = doc("search").value.toLowerCase();
    if (!doc("search-results")) {
        return;
    }
    doc("search-results").innerHTML = '';
    fetch("assets/fietsen.txt")
    .then((response) => response.text())
    .then((text) => {
        const bikes = text.split("\n");
        for (const bike of bikes) {
            const [number, bikename, drivetype, driveoffer, bikegender, biketype, bikebrand, isnew, bikecolor, bikeprice, bikecommentary] = bike.split(":");
            
            const newbike = addBike(bikename);
            const isVisible = bikename.toLowerCase().includes(search);
            if (!isVisible) {
                newbike.remove();
            }
            newbike.addEventListener('click', () => {
                window.location.href = `./bikes.html?bikename=${encodeURIComponent(bikename)}`;
            });

        }
        UpdateSearchItemCount();
    })
    .catch((e) => console.error(e));
}

function addBike(bikename) {

    const searchItem = document.createElement('div');
    searchItem.classList.add("search-item");
    const searchImg = document.createElement('img');
    const formattedBikeName = bikename.split(' ').join('_');
    searchImg.src = `images/fietsen/${formattedBikeName}.jpg`;

    const searchInfo = document.createElement('div');
    searchInfo.classList.add("shopping-cart-item-info", "flex");
    const bikeTitle = document.createElement('h3');
    bikeTitle.innerHTML = bikename;

    searchInfo.appendChild(bikeTitle);

    searchItem.appendChild(searchImg);
    searchItem.appendChild(searchInfo);
    
    doc("search-results").appendChild(searchItem);
    return searchItem;
}

function UpdateSearchItemCount() {
    const itemCount = doc("search-results").children.length;
    document.getElementsByClassName("search-container")[0].style.setProperty('--search-item-count', itemCount);
}

function OnSearchFocus(event) {
    const searchResults = doc("search-results");
    if (!searchResults) {
        return;
    }
    if (event.type === 'focus') {
        UpdateSearchDropdown()
        searchResults.classList.remove('hidden');
    } else if (event.type === 'focusout') {
        document.getElementsByClassName("search-container")[0].style.setProperty('--delay-transition', "0.4s");
        searchResults.classList.add("close-search-results");
        setTimeout(() => {
            searchResults.classList.add('hidden');
            searchResults.classList.remove("close-search-results");
            doc("search-results").innerHTML = '';
            UpdateSearchItemCount()
            setTimeout(() => {
                document.getElementsByClassName("search-container")[0].style.setProperty('--delay-transition', "0s");
            }, 50);
        }, 400);
    }
}

function DriveAnimation(element) {
    let position = 0;
    let direction = 1;
    const speed = 0.1; 

    function frame() {
        if (position >= 96 && direction === 1) {
            direction = -1;
            element.style.transform = 'scaleX(-1)';
        } else if (position <= 0 && direction === -1) {
            direction = 1;
            element.style.transform = 'scaleX(1)';
        }
        position += direction * speed;
        element.style.left = position + '%';
        requestAnimationFrame(frame);
    }
    frame();
}

let shoppingcart = JSON.parse(sessionStorage.getItem('shopping-cart')) || [];

function ToggleShoppingCart() {
    if (doc("shopping-cart-container").style.left === '100%') {
        OpenShoppingCart();
    } else {
        CloseShoppingCart();
    }
}

function OpenShoppingCart() {
    doc("shopping-cart-container").style.left = 'var(--open-shopping-cart-width)';
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

async function LoadShoppingCart() {
    shoppingcart.forEach(item => {
        const pricelabeltext = `Prijs: €${(item.newbikeprice).replace('.', ',')}`;
        CreateItemInShoppingCart(item.Bikename, pricelabeltext, false);
    });
    await AddPriceToTotal();
    doc("shopping-cart-container").style.left = '100%';
    doc("shopping-cart-container").style.setProperty('--shopping-cart-width', doc("shopping-cart-container").offsetWidth + 'px');
}

document.addEventListener("DOMContentLoaded", () => {
    LoadShoppingCart();
    
    if (SearchBtnMode) {
        doc("search-btn").addEventListener('click', SearchBikes);
        doc("search").addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                SearchBikes();
            }
        });
    } else {
        doc("search").addEventListener('input', SearchBikes);
    }
    doc("search").addEventListener('focus', OnSearchFocus);
    doc("search").addEventListener('focusout', OnSearchFocus);
    // LoadSearchItems();
    doc("search").addEventListener('input', UpdateSearchDropdown);


    DriveAnimation(doc("driving-bike"));
});

window.addEventListener('resize', () => {
    doc("shopping-cart-container").style.setProperty('--shopping-cart-width', doc("shopping-cart-container").offsetWidth + 'px');
});