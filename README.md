
# 🚗 AutoTrack – Evidencija vozila i servisa

**AutoTrack** je jednostavna web aplikacija za vođenje evidencije o osobnim vozilima i njihovim servisima. Omogućuje korisnicima da unesu i prate podatke o vozilima, bilježe obavljene servise i vizualiziraju troškove tijekom vremena.

Ova aplikacija je izrađena u sklopu kolegija **Informacijski sustavi**.

---

## 🛠️ Tehnologije korištene u projektu

- 🐍 Backend: Python (Flask), PonyORM, SQLite
- 🌐 Frontend: HTML, CSS (Bootstrap 5), JavaScript
- 📊 Vizualizacija: Chart.js
- 🐳 Deployment: Docker & Docker Compose

---

## 🚗 Funkcionalnosti

- ➕ Dodavanje, pregled, brisanje vozila
- 🛠️ Dodavanje i brisanje servisa za pojedino vozilo
- 📅 Prikaz svih servisa s datumom, kilometražom i cijenom
- 📈 Vizualizacija troškova servisa kroz vrijeme (Chart.js)
- 🔁 Ažuriranje frontenda i backenda putem REST API-ja
- ⚙️ Pokretanje aplikacije kroz Docker (backend i frontend)

---

## ▶️ Pokretanje aplikacije (Docker)

### 📋 Preduvjeti:
- Instaliran Docker Desktop: [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)

### 📦 Upute:

1. Kloniraj repozitorij:
```bash
git clone https://github.com/marko171189/AutoTrack.git
cd AutoTrack
```

2. Pokreni aplikaciju:
```bash
docker compose up --build
```

3. Otvori preglednik:
- 🌐 Frontend: http://localhost:8080
- 🛠️ Backend API: http://localhost:5000/vozila

---

## 🧪 Testni scenarij

1. Otvori aplikaciju na `http://localhost:8080`
2. Dodaj novo vozilo (marka, model, godina, registracija, kilometri)
3. Klikni gumb **"Servisi"** pored vozila
4. Dodaj jedan ili više servisa za to vozilo
5. Tablica se popunjava + prikazuje se graf troškova (Chart.js)
6. Servisi se mogu i brisati

---

## 📁 Struktura projekta

```
AutoTrack/
├── backend/
│   ├── app.py
│   ├── models.py
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── index.html
│   ├── servisi.html
│   ├── css/
│   │   └── styles.css
│   └── js/
│       ├── script.js
│       └── servisi.js
└── docker-compose.yml
```

---

## 📹 Video demonstracija

🎥 Video s prikazom funkcionalnosti i pokretanjem aplikacije nalazi se na:  
**url**

---

## 👤 Autor

- **Marko Aleksić**
- Student **FIPU**
- Godina: 2025
