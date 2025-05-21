# Baza: Python image
FROM python:3.10-slim

# Radna mapa u kontejneru
WORKDIR /app

# Kopiraj sve
COPY . .

# Instaliraj ovisnosti
RUN pip install --no-cache-dir -r requirements.txt

# Pokreni aplikaciju
CMD ["python", "app.py"]
