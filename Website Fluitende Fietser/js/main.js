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

function DriveAnimation(element) {
    let position = 0;
    let direction = 1;
    const speed = 0.2; 

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

document.addEventListener("DOMContentLoaded", () => {
    // LoadBikes();
    // doc("close-bigger-bike").addEventListener('click', CloseBikeInfo);
    
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

    DriveAnimation(doc("driving-bike"));
});