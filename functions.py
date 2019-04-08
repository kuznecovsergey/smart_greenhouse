from models import Measurement
from app import db

def get_data():
    data = db.session.query(Measurement).order_by(Measurement.id)[-5:]
    response = {}
    headers = list(data[0].__dict__.keys())[2:]

         #response += str(item.time) + '<br>'
        
    return response

