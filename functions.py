from models import Measurement
from app import db
from time import mktime
import json

def get_data():
    data = db.session.query(Measurement).order_by(Measurement.id)[-5:]
    temperature_data = db.session.query(Measurement).filter_by(id_dev = '0').order_by(Measurement.id)[-1:]
    humidity_data = db.session.query(Measurement).filter_by(id_dev = '1').order_by(Measurement.id)[-1:]
    window_data = db.session.query(Measurement).filter_by(id_dev = '2').order_by(Measurement.id)[-1:]
    valve_data = db.session.query(Measurement).filter_by(id_dev = '3').order_by(Measurement.id)[-1:]
    
    response = {}
    
    # Добавление данных о температуре внутри теплицы
    milliseconds = mktime(temperature_data[0].time.timetuple())*1000;
    response.update({'tmp': {'date': milliseconds, 'value': str(temperature_data[0].value)}})

    # Добавление данных о влажности внутри теплицы
    milliseconds = mktime(humidity_data[0].time.timetuple())*1000;
    response.update({'humidity': {'date': milliseconds, 'value': str(humidity_data[0].value)}})
    
    # Добавление данных о состоянии клапана
    milliseconds = mktime(valve_data[0].time.timetuple())*1000;
    response.update({'valve': {'date': milliseconds, 'value': str(valve_data[0].value)}})
    
    # Добавление данных о состоянии форточки
    milliseconds = mktime(window_data[0].time.timetuple())*1000;
    response.update({'window': {'date': milliseconds, 'value': str(window_data[0].value)}})

    response = json.dumps(response, indent=4, sort_keys=True, ensure_ascii=False)
        
    return response

