const api = 'http://localhost:5000';
const params = new URLSearchParams(window.location.search);
const voziloId = params.get('id');

document.getElementById('vozilo-id').value = voziloId;
document.getElementById('vozilo-id-prikaz').textContent = voziloId;

let chart;

async function ucitajServise() {
    const res = await fetch(`${api}/servisi/${voziloId}`);
    const servisi = await res.json();
    const tbody = document.getElementById('servisi-body');
    tbody.innerHTML = '';

    servisi.forEach(s => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${s.id}</td>
            <td>${s.opis}</td>
            <td>${s.datum_servisa}</td>
            <td>${s.kilometraža}</td>
            <td>${s.cijena.toFixed(2)}</td>
            <td><button class="btn btn-danger btn-sm" onclick="obrisiServis(${s.id})">Obriši</button></td>
        `;
        tbody.appendChild(tr);
    });

    // Prikaz grafa
    const labels = servisi.map(s => s.datum_servisa);
    const vrijednosti = servisi.map(s => s.cijena);

    const ctx = document.getElementById('troškoviChart').getContext('2d');
    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Cijena servisa (€)',
                data: vrijednosti,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Statistika troškova – ukupno
    const ukupno = vrijednosti.reduce((acc, val) => acc + val, 0);
    document.getElementById('ukupno-cijena').textContent = ukupno.toFixed(2);
}

async function obrisiServis(id) {
    if (!confirm('Obrisati ovaj servis?')) return;
    await fetch(`${api}/servis/${id}`, { method: 'DELETE' });
    ucitajServise();
}

document.getElementById('servis-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        vozilo_id: parseInt(document.getElementById('vozilo-id').value),
        opis: document.getElementById('opis').value,
        datum_servisa: document.getElementById('datum_servisa').value,
        kilometraza: parseInt(document.getElementById('kilometraza').value),
        cijena: parseFloat(document.getElementById('cijena').value)
    };
    await fetch(`${api}/servis`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    e.target.reset();
    ucitajServise();
});

ucitajServise();
