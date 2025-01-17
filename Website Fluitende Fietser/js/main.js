const doc = document.getElementById.bind(document);
document.addEventListener("DOMContentLoaded", () => {
    doc("close-bigger-bike").addEventListener('click', () => {
        CloseBikeInfo();
    });
    
    doc("search").addEventListener('input', e => {
       
        const search = e.target.value.toLowerCase();
        
        var children = doc("shop-container").children;
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            const isVisible = child.innerText.toLowerCase().includes(search);
            child.classList.toggle('hidden', !isVisible);
        }
    });


   fetch("../assets/fietsen.txt")
  .then((respnse) => respnse.text())
  .then((text) => {
    const bikes = text.split("\n");
    for (const bike of bikes) {
        // console.log(bike);
        const [number, bikename, drivetype, driveoffer, bikegender, biketype, bikebrand, isnew, bikecolor, bikeprice, bikecommentary] = bike.split(":");
        console.log(`bikename: ${bikename}`); // Pelikaan Carry On Lady
        console.log(`drivetype: ${drivetype}`); // elektrisch
        console.log(`driveoffer: ${driveoffer}`); // geschikt voor zakelijk en prive
        console.log(`bikegender: ${bikegender}`);  // dames
        console.log(`biketype: ${biketype}`); // transport
        console.log(`bikebrand: ${bikebrand}`); // Pelikaan
        console.log(`isnew: ${isnew}`); // nieuw
        console.log(`bikecolor: ${bikecolor}`); // zwart
        console.log(`bikeprice: ${bikeprice}`); // 769,00
        console.log(`bikecommentary: ${bikecommentary}`); // 28 Inch 53 cm 3V V-Brakes

        const button = addBike(bikename);
        button.addEventListener('click', () => {
            console.log('Button clicked:');
            OpenBikeInfo(bikename, bikebrand, bikeprice, biketype, bikecolor, bikegender, driveoffer, isnew, null, bikecommentary);
        });
    }


   })
  .catch((e) => console.error(e));
});

// const shopContainer = doc("shop-container");
// const biggerBikeContainer = doc("bigger-bike-container");

function OpenBikeInfo(bikename, bikebrand, bikeprice, biketype, bikecolor, bikegender, driveoffer, isnew, bikecode, bikecommentary) {
    doc("shop-container").style.display = 'none';
    doc("bigger-bike-container").style.display = 'grid';
    doc("bike-name").innerHTML = bikename;
    doc("bike-brand").innerHTML = `Merk: ${bikebrand}`;
    doc("bike-price").innerHTML = `€${bikeprice}`;
    doc("bike-type").innerHTML = biketype;
    doc("bike-color").innerHTML = bikecolor
    doc("bike-gender").innerHTML = bikegender;
    doc("bike-offer").innerHTML = driveoffer;
    doc("bike-hand").innerHTML = isnew;
    doc("bike-code").innerHTML = bikecode;
    doc("bike-commentary").innerHTML = bikecommentary;
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