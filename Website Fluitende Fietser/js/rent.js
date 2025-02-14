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
                    <td>
                      <label class="checkbox">
                        <input type="checkbox" id="rentbike${lines.indexOf(line)}" name="bike" value="${type.trim()}">
                        <div class="checkbox-wrapper">
                        <div class="checkbox-bg"></div>
                        <svg fill="none" viewBox="0 0 24 24" class="checkbox-icon">
                            <path
                            stroke-linejoin="round"
                            stroke-linecap="round"
                            stroke-width="3"
                            stroke="currentColor"
                            d="M4 12L10 18L20 6"
                            class="check-path"
                            ></path>
                        </svg>
                        </div>
                    </label>
                    </td>
                    <td>${type.trim()}</td>
                    <td>${price.trim()}</td>
                `;
                    tbody.appendChild(row);
                    row.addEventListener('click', function(event) {
                        event.preventDefault();
                        var checkbox = document.getElementById(`rentbike${lines.indexOf(line)}`);
                        checkbox.checked = !row.classList.contains('checkbox-selected');
                        row.classList.toggle('checkbox-selected');
                    });
                }
            });
        })
        .catch(error => console.error('Error fetching bike rental data:', error));

    document.getElementById('reserve-button').addEventListener('click', Rentbikes);
});

function Rentbikes(event) {
    event.preventDefault();
    const checkboxes = document.querySelectorAll('input[name="bike"]:checked');
    if (checkboxes.length === 0) {
        alert('Selecteer alstublieft minstens één fiets om te reserveren.');
    } else {
        window.location.href = 'rentpage.html';
    }
}