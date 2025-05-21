from pony.orm import Database, Required, Optional, Set
from datetime import datetime

# Inicijalizacija baze
db = Database()
db.bind(provider='sqlite', filename='database.db', create_db=True)

# ----------------------
# DEFINICIJA MODELA
# ----------------------

class Vozilo(db.Entity):
    marka = Required(str)
    model = Required(str)
    godina_proizvodnje = Required(int)
    registracija = Required(str, unique=True)
    broj_kilometara = Required(int)
    servisi = Set('Servis')
    datum_kreiranja = Required(datetime, default=datetime.now)
    datum_promjene = Optional(datetime)

    def to_dict(self):
        return {
            'id': self.id,
            'marka': self.marka,
            'model': self.model,
            'godina_proizvodnje': self.godina_proizvodnje,
            'registracija': self.registracija,
            'broj_kilometara': self.broj_kilometara,
            'datum_kreiranja': self.datum_kreiranja.strftime('%Y-%m-%d %H:%M'),
            'datum_promjene': self.datum_promjene.strftime('%Y-%m-%d %H:%M') if self.datum_promjene else None
        }

class Servis(db.Entity):
    vozilo = Required(Vozilo)
    opis = Required(str)
    datum_servisa = Required(datetime)
    kilometraža = Required(int)
    cijena = Required(float)
    datum_kreiranja = Required(datetime, default=datetime.now)
    datum_promjene = Optional(datetime)

    def to_dict(self):
        return {
            'id': self.id,
            'vozilo_id': self.vozilo.id,
            'opis': self.opis,
            'datum_servisa': self.datum_servisa.strftime('%Y-%m-%d'),
            'kilometraža': self.kilometraža,
            'cijena': self.cijena,
            'datum_kreiranja': self.datum_kreiranja.strftime('%Y-%m-%d %H:%M'),
            'datum_promjene': self.datum_promjene.strftime('%Y-%m-%d %H:%M') if self.datum_promjene else None
        }

# ----------------------
# GENERIRANJE TABLICA
# ----------------------

db.generate_mapping(create_tables=True)
