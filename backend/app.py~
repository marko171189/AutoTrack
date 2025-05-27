from flask import Flask, request, jsonify
from flask_cors import CORS
from pony.orm import db_session, select
from models import db, Vozilo, Servis
from datetime import datetime

app = Flask(__name__)
CORS(app)  # ➕ omogućava CORS pristup iz frontend-a (npr. localhost:63342)

# ------------------------
# CRUD ZA VOZILA
# ------------------------

@app.route('/vozila', methods=['GET'])
@db_session
def get_vozila():
    vozila = select(v for v in Vozilo)[:]
    return jsonify([v.to_dict() for v in vozila])

@app.route('/vozilo', methods=['POST'])
@db_session
def create_vozilo():
    data = request.json
    vozilo = Vozilo(
        marka=data['marka'],
        model=data['model'],
        godina_proizvodnje=data['godina_proizvodnje'],
        registracija=data['registracija'],
        broj_kilometara=data['broj_kilometara'],
        datum_kreiranja=datetime.now()
    )
    return jsonify(vozilo.to_dict())

@app.route('/vozilo/<int:vozilo_id>', methods=['PUT'])
@db_session
def update_vozilo(vozilo_id):
    data = request.json
    vozilo = Vozilo.get(id=vozilo_id)
    if not vozilo:
        return jsonify({'error': 'Vozilo ne postoji'}), 404

    vozilo.marka = data['marka']
    vozilo.model = data['model']
    vozilo.godina_proizvodnje = data['godina_proizvodnje']
    vozilo.registracija = data['registracija']
    vozilo.broj_kilometara = data['broj_kilometara']
    vozilo.datum_promjene = datetime.now()

    return jsonify(vozilo.to_dict())

@app.route('/vozilo/<int:vozilo_id>', methods=['DELETE'])
@db_session
def delete_vozilo(vozilo_id):
    vozilo = Vozilo.get(id=vozilo_id)
    if vozilo:
        vozilo.delete()
        return '', 204
    return jsonify({'error': 'Vozilo ne postoji'}), 404

# ------------------------
# CRUD ZA SERVISE
# ------------------------

@app.route('/servisi/<int:vozilo_id>', methods=['GET'])
@db_session
def get_servisi(vozilo_id):
    vozilo = Vozilo.get(id=vozilo_id)
    if not vozilo:
        return jsonify({'error': 'Vozilo ne postoji'}), 404
    return jsonify([s.to_dict() for s in vozilo.servisi])

@app.route('/servis', methods=['POST'])
@db_session
def create_servis():
    data = request.json
    vozilo = Vozilo.get(id=data['vozilo_id'])
    if not vozilo:
        return jsonify({'error': 'Vozilo ne postoji'}), 404
    servis = Servis(
        vozilo=vozilo,
        opis=data['opis'],
        datum_servisa=datetime.strptime(data['datum_servisa'], '%Y-%m-%d'),
        kilometraža=data['kilometraza'],
        cijena=data['cijena'],
        datum_kreiranja=datetime.now()
    )
    return jsonify(servis.to_dict())

@app.route('/servis/<int:servis_id>', methods=['PUT'])
@db_session
def update_servis(servis_id):
    data = request.json
    servis = Servis.get(id=servis_id)
    if not servis:
        return jsonify({'error': 'Servis ne postoji'}), 404

    servis.opis = data['opis']
    servis.datum_servisa = datetime.strptime(data['datum_servisa'], '%Y-%m-%d')
    servis.kilometraža = data['kilometraza']
    servis.cijena = data['cijena']
    servis.datum_promjene = datetime.now()

    return jsonify(servis.to_dict())

@app.route('/servis/<int:servis_id>', methods=['DELETE'])
@db_session
def delete_servis(servis_id):
    servis = Servis.get(id=servis_id)
    if servis:
        servis.delete()
        return '', 204
    return jsonify({'error': 'Servis ne postoji'}), 404

# ------------------------
# Pokretanje aplikacije
# ------------------------

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")

