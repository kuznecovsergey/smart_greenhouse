
# -*- coding: utf-8 -*-
from app import db
import json, threading
import paho.mqtt.client as mqtt

from models import Measurement
from datetime import datetime

def write_to_db(temp, hum, window, valve):
	date = datetime.now()

	temp_record = Measurement()
	temp_record.add_new_record('0', temp, date)
	db.session.add(temp_record)

	hum_record = Measurement()
	hum_record.add_new_record('1', hum, date)
	db.session.add(hum_record)

	window_record = Measurement()
	window_record.add_new_record('2', window, date)
	db.session.add(window_record)

	valve_record = Measurement()
	valve_record.add_new_record('3', valve, date)
	db.session.add(valve_record)

	db.session.commit()

def on_connect(client, userdata, flags, rc):
	print("Connected with result code "+str(rc))
	path = "greenhouse/measurements"

	client.subscribe(path)
	client.message_callback_add(path, on_get_measurements)

def on_get_measurements(client, userdata, msg):
	data_string = msg.payload.decode("utf-8")
	data = json.loads(data_string)

	hum = data["data"]["adc2"]
	temp = data["data"]["adc3"]

	print("Влажность: %d, темп: %d" % (hum, temp))

	window = 1
	valve = 1

	write_to_db(temp, hum, window, valve)

	client.publish("greenhouse/miso/gpio", payload='pump '+ str(1) +' wind '+ str(1), qos=0, retain=False)

client = mqtt.Client()
client.on_connect = on_connect
client.connect("localhost") 

def loop():
    client.loop_start()
    
thread_mqtt = threading.Thread(target=loop)
thread_mqtt.daemon = True
thread_mqtt.start()
	
while True:
    pass
