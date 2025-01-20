document.addEventListener("DOMContentLoaded", function() {
    fetch('assets/historie.txt')
        .then(response => response.text())
        .then(data => {
            document.getElementById('about-us-text').innerText = data;
        })
        .catch(error => console.error('Error fetching the historie.txt file:', error));
});
