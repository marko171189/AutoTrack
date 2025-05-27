from flask import Flask, request, jsonify
from flask_cors import CORS
from pony.orm import Database, Required, Set, db_session, PrimaryKey

db = Database()

class Vozilo(db.Entity):
    id = PrimaryKey(int, auto=True)
    marka = Required(str)
    model = Required(str)
    godina_proizvodnje = Required(int)
    registracija = Required(str)
    broj_kilometara = Required(int)
    servisi = Set('Servis')

    def to_dict(self):
        return {
            "id": self.id,
            "marka": self.marka,
            "model": self.model,
            "godina_proizvodnje": self.godina_proizvodnje,
            "registracija": self.registracija,
            "broj_kilometara": self.broj_kilometara
        }

class Servis(db.Entity):
    id = PrimaryKey(int, auto=True)
    opis = Required(str)
    datum_servisa = Required(str)
    kilometraza = Required(int)
    cijena = Required(float)
    vozilo = Required(Vozilo)

    def to_dict(self):
        return {
            "id": self.id,
            "opis": self.opis,
            "datum_servisa": self.datum_servisa,
            "kilometraža": self.kilometraza,
            "cijena": self.cijena,
            "vozilo_id": self.vozilo.id
        }

db.bind(provider='sqlite', filename='autotrack.db', create_db=True)
db.generate_mapping(create_tables=True)

app = Flask(__name__)
CORS(app)

# --- VOZILA ---
@app.route('/vozila', methods=['GET'])
@db_session
def get_vozila():
    return jsonify([v.to_dict() for v in Vozilo.select()])

@app.route('/vozilo', methods=['POST'])
@db_session
def dodaj_vozilo():
    data = request.json
    v = Vozilo(**data)
    return jsonify(v.to_dict())

@app.route('/vozilo/<int:id>', methods=['DELETE'])
@db_session
def obrisi_vozilo(id):
    v = Vozilo.get(id=id)
    if v: v.delete()
    return jsonify({'message': 'obrisano'})

@app.route('/vozilo/<int:id>', methods=['PUT'])
@db_session
def azuriraj_vozilo(id):
    data = request.json
    v = Vozilo.get(id=id)
    if v:
        v.marka = data['marka']
        v.model = data['model']
        v.godina_proizvodnje = data['godina_proizvodnje']
        v.registracija = data['registracija']
        v.broj_kilometara = data['broj_kilometara']
    return jsonify({'message': 'ažurirano'})

# --- SERVISI ---
@app.route('/servisi/<int:vozilo_id>', methods=['GET'])
@db_session
def get_servisi(vozilo_id):
    vozilo = Vozilo.get(id=vozilo_id)
    if not vozilo: return jsonify([])
    return jsonify([s.to_dict() for s in vozilo.servisi])

@app.route('/servis', methods=['POST'])
@db_session
def dodaj_servis():
    data = request.json
    s = Servis(
        opis=data['opis'],
        datum_servisa=data['datum_servisa'],
        kilometraza=data['kilometraza'],
        cijena=data['cijena'],
        vozilo=Vozilo.get(id=data['vozilo_id'])
    )
    return jsonify(s.to_dict())

@app.route('/servis/<int:id>', methods=['DELETE'])
@db_session
def obrisi_servis(id):
    s = Servis.get(id=id)
    if s: s.delete()
    return jsonify({'message': 'obrisano'})

@app.route('/servis/<int:id>', methods=['PUT'])
@db_session
def azuriraj_servis(id):
    data = request.json
    s = Servis.get(id=id)
    if s:
        s.opis = data['opis']
        s.datum_servisa = data['datum_servisa']
        s.kilometraza = data['kilometraza']
        s.cijena = data['cijena']
        s.vozilo = Vozilo.get(id=data['vozilo_id'])
    return jsonify({'message': 'ažurirano'})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
