from app import app
from app import db
from models import Measurement
from datetime import datetime
import time
import view

if __name__ == '__main__':
	a = Measurement()
	b = datetime.now()
	a.add_new_record('0123456789012345', 17.4, b)
	db.session.add(a)
	db.session.commit()
	time.sleep(3);
	for item in db.session.query(Measurement).order_by(Measurement.id):
		print(item.id_dev, ' ', item.value, ' ', item.time)
	print("Success!")
	app.run()
