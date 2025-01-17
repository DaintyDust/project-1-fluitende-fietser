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

function LoadBikes() {
    fetch("../assets/fietsen.txt")
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
    doc("bike-gender").innerHTML = `Gendere :${bikegender}`;
    doc("bike-offer").innerHTML = `Offer: ${driveoffer}`;
    doc("bike-hand").innerHTML = `Isnieuw: ${isnew}`;
    doc("bike-code").innerHTML = `Bikecode: ${bikecode}`;
    doc("bike-commentary").innerHTML = `Opmerking: ${bikecommentary}`;
    doc("bigger-bike-image").src = `../images/fietsen/${bikename}.jpg`;
}
function CloseBikeInfo() {
    doc("shop-container").style.display = 'grid';
    doc("bigger-bike-container").style.display = 'none';
}

function addBike(bikename) {
    const newbtn = document.createElement('button');
    newbtn.classList.add("shop-button");
    const newimg = document.createElement('img');
    newimg.src = `../images/fietsen/${bikename}.jpg`;
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
    newimg.src = "../images/fietsen/Allegra voorwielmotor.jpg";
    const newlabel = document.createElement('label');
    newlabel.innerHTML = "Stella Allegra voorwielmoter";
    
    newbtn.appendChild(newimg);
    newbtn.appendChild(newlabel);
    doc("shop-container").appendChild(newbtn);
}

function remove() {
    doc("shop-container").children[0].remove();
}

document.addEventListener("DOMContentLoaded", () => {
    LoadBikes();
    doc("close-bigger-bike").addEventListener('click', CloseBikeInfo);
    
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
});