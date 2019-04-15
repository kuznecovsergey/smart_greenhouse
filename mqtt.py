
# -*- coding: utf-8 -*-
from app import db
import json, threading
import paho.mqtt.client as mqtt
from models import Measurement
from datetime import datetime

def on_connect(client, userdata, flags, rc):
	print("Connected with result code "+str(rc))
	path = "greenhouse/measurements"

	client.subscribe(path)
	client.message_callback_add(path, on_get_temp)

def on_get_temp(client, userdata, msg):
	data_string = msg.payload.decode("utf-8")
	data = json.loads(data_string)

	hum = data["data"]["adc2"]
	temp = data["data"]["adc3"]

	print("влажность: %d" % hum)
	print("темп: %d" % temp)
	print()
	temp_record = Measurement()
	hum_record = Measurement()
	window_record = Measurement()
	valve_record = Measurement()
	b = datetime.now()
	temp_record.add_new_record('1', hum, b)
	hum_record.add_new_record('0', temp, b)
	window_record.add_new_record('2', 0, b)
	valve_record.add_new_record('3', 1, b)
	db.session.add(temp_record)
	db.session.add(hum_record)
	db.session.add(window_record)
	db.session.add(valve_record)
	db.session.commit()
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
