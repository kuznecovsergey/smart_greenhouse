import paho.mqtt.client as mqtt
import time



def on_connect(client, userdata, flags, rc):

    print("Connected with result code "+str(rc))

    client.subscribe("$SYS/#")



def on_message(client, userdata, msg):

    print(msg.topic+" "+str(msg.payload))



client = mqtt.Client()

client.on_connect = on_connect

client.on_message = on_message

client.connect("iot.eclipse.org", 1883, 60)

client.loop_start()

while True:
	client.publish("1", payload='temperature', qos=0, retain=False)
	time.sleep(5);

client.loop_forever()

