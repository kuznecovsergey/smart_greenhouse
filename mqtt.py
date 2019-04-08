
# -*- coding: utf-8 -*-

import json, threading
import paho.mqtt.client as mqtt

def on_connect(client, userdata, flags, rc):
	print("Connected with result code "+str(rc))
	path = "devices/lora/807B85902000021C/miso"

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

client = mqtt.Client()
client.on_connect = on_connect

client.connect("192.168.100.118") 

def loop():
    client.loop_forever()

thread_mqtt = threading.Thread(target=loop)
thread_mqtt.daemon = True
thread_mqtt.start()
	
while True:
    pass
