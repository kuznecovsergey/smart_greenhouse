from app import app
from app import db
from models import Measurement
from datetime import datetime
import view

if __name__ == '__main__':
	
	'''a = Measurement()
	ab = Measurement()
	ac = Measurement()
	ad = Measurement()

	b = datetime.now()
	a.add_new_record('0', 17.4, b)
	db.session.add(a)

	b = datetime.now()
	ab.add_new_record('1', 17.54, b)
	db.session.add(ab)

	b = datetime.now()
	ac.add_new_record('2', 2.15, b)
	db.session.add(ac)

	b = datetime.now()
	ad.add_new_record('3', 3.15, b)
	db.session.add(ad)

	db.session.commit()'''

	app.run()
