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
                        <td><input type="checkbox" name="bike" value="${type.trim()}"></td>
                        <td>${type.trim()}</td>
                        <td>${price.trim()}</td>
                    `;
                    tbody.appendChild(row);
                }
            });
        })
        .catch(error => console.error('Error fetching bike rental data:', error));
});