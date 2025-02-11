document.addEventListener('DOMContentLoaded', function() {
    fetch('assets/rent.txt')
        .then(response => response.text())
        .then(data => {
            const lines = data.split('\n');
            const tbody = document.getElementById('bike-rental-tbody');
            lines.forEach(line => {
                const [type, price] = line.split(',');
                if (type && price) {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td><input type="checkbox" id=rentbike${lines.indexOf(line)} name="bike" value="${type.trim()}"></td>
                        <td>${type.trim()}</td>
                        <td>${price.trim()}</td>
                    `;
                    tbody.appendChild(row);
                    row.addEventListener('click', function() {
                        var checkbox = doc(`rentbike${lines.indexOf(line)}`);
                        checkbox.checked = !checkbox.checked;
                        row.classList.toggle('checkbox-selected');
                    });
                }
            });
        })
        .catch(error => console.error('Error fetching bike rental data:', error));
});