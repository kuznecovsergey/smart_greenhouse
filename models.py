from app import db

class Measurement(db.Model, db.Session):
	__tablename__ = 'measurement'

	id = db.Column(db.Integer, primary_key=True)
	id_dev = db.Column(db.String(16), nullable=False)
	value = db.Column(db.Float, nullable=False)
	time = db.Column(db.DateTime, nullable=False)

	def add_new_record(self, id_dev, value, time):
		self.id_dev = id_dev
		self.value = value
		self.time = time
