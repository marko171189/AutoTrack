const api = 'http://localhost:5000';
let urediId = null;

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
                <button class="btn btn-warning btn-sm me-1" onclick="popuniFormu(${v.id})">Uredi</button>
                <button class="btn btn-danger btn-sm" onclick="obrisiVozilo(${v.id})">Obriši</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

async function obrisiVozilo(id) {
    if (!confirm('Obrisati vozilo?')) return;
    await fetch(`${api}/vozilo/${id}`, { method: 'DELETE' });
    ucitajVozila();
}

async function popuniFormu(id) {
    const res = await fetch(`${api}/vozila`);
    const vozila = await res.json();
    const vozilo = vozila.find(v => v.id === id);
    if (!vozilo) return;

    document.getElementById('marka').value = vozilo.marka;
    document.getElementById('model').value = vozilo.model;
    document.getElementById('godina').value = vozilo.godina_proizvodnje;
    document.getElementById('registracija').value = vozilo.registracija;
    document.getElementById('kilometri').value = vozilo.broj_kilometara;

    urediId = id;
    document.getElementById('vozilo-btn').textContent = 'Spremi izmjene';
    document.getElementById('vozilo-btn').classList.remove('btn-primary');
    document.getElementById('vozilo-btn').classList.add('btn-success');
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

    if (urediId) {
        await fetch(`${api}/vozilo/${urediId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        urediId = null;
        document.getElementById('vozilo-btn').textContent = 'Dodaj vozilo';
        document.getElementById('vozilo-btn').classList.remove('btn-success');
        document.getElementById('vozilo-btn').classList.add('btn-primary');
    } else {
        await fetch(`${api}/vozilo`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    }

    e.target.reset();
    ucitajVozila();
});

ucitajVozila();
