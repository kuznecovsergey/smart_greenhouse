from app import app
from app import db
from models import Measurement
from datetime import datetime
import view

if __name__ == '__main__':
	a = Measurement()
	b = datetime.now()
	a.add_new_record('0123456789012345', 17.4, b)
	db.session.add(a)
	db.session.commit()
	print("Success!")
	app.run()
