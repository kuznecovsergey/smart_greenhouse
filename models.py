from app import db

class Measurement(db.Model):
	__tablename__ = 'measurement'

	id = db.Column(db.Integer, primary_key=True)
	id_dev = db.Column(db.String(16), nullable=False)
	value = db.Column(db.Float, nullable=False)
	time = db.Column(db.DateTime, nullable=False)