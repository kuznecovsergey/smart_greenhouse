from app import db

class Measurement(db.Model):
 """
	Здесь будут описаны таблицы базы данных
   __tablename__ = 'stations'

    id = db.Column(db.Integer, primary_key = True)
    lat = db.Column(db.Float)
    lng = db.Column(db.Float)
"""