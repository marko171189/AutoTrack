const api = 'http://localhost:5000';

async function ucitajVozila() {
    const res = await fetch(`${api}/vozila`);
    const vozila = await res.json();
    const tbody = document.getElementById('vozila-body');
    tbody.innerHTML = '';
    vozila.forEach(v => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${v.id}</td>
            <td>${v.marka}</td>
            <td>${v.model}</td>
            <td>${v.godina_proizvodnje}</td>
            <td>${v.registracija}</td>
            <td>${v.broj_kilometara}</td>
            <td>
                <a href="servisi.html?id=${v.id}" class="btn btn-secondary btn-sm me-1">Servisi</a>
                <button class="btn btn-danger btn-sm" onclick="obrisiVozilo(${v.id})">Obriši</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

async function obrisiVozilo(id) {
    if (!confirm('Obrisati vozilo?')) return;
    await fetch(`${api}/vozilo/${id}`, {
        method: 'DELETE'
    });
    ucitajVozila();
}

document.getElementById('vozilo-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        marka: document.getElementById('marka').value,
        model: document.getElementById('model').value,
        godina_proizvodnje: parseInt(document.getElementById('godina').value),
        registracija: document.getElementById('registracija').value,
        broj_kilometara: parseInt(document.getElementById('kilometri').value)
    };
    await fetch(`${api}/vozilo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    e.target.reset();
    ucitajVozila();
});

ucitajVozila();
