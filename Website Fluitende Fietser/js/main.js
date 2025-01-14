document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll('.shop-button').forEach(button => {
        button.addEventListener('click', () => {
            console.log('Button clicked:');
            OpenBikeInfo(button);
        });
    });
    
});

// const shopContainer = document.getElementById("shop-container");
// const biggerBikeContainer = document.getElementById("bigger-bike-container");

function OpenBikeInfo(button) {
    document.getElementById("shop-container").style.display = 'none';
    document.getElementById("bigger-bike-container").style.display = 'flex';


}

function add() {
    const newbtn = document.createElement('button');
    newbtn.classList.add("shop-button");
    const newimg = document.createElement('img');
    newimg.src = "images/fietsen/Stella_Allegra_voorwielmotor.jpg";
    const newlabel = document.createElement('label');
    newlabel.innerHTML = "Stella Allegra voorwielmoter";
    
    newbtn.appendChild(newimg);
    newbtn.appendChild(newlabel);
    document.getElementById("shop-container").appendChild(newbtn);
}

function remove() {
    document.getElementById("shop-container").children[0].remove();
}