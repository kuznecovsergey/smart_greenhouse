var PROTOCOL = 'lora';
var MQTT_ADDRESS = 'localhost';
var MQTT_PORT = 1883;
var MQTT_CLIENT = 'smartgarden_emul';
var EUI_ADC = "807B85902000021E";
var EUI_me = "807B85902000021C";
var TIMER_INTERVAL = 2500;
var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://'+MQTT_ADDRESS+':'+MQTT_PORT, MQTT_CLIENT);
client.on('connect', onConnected);
client.on('message', onMessageReceived);
var GPIO = [1, 1];
function onMessageReceived(topic, message) {
	var t = topic.toString();
	var m = message.toString();
	console.log(' > ', t, m);
	if (t != "devices/"+PROTOCOL+"/"+EUI_me+"/miso/gpio") return;
	if (m == "get all") {
		var data_GPIO = {
			data : {
				gpios: GPIO
			},
			status : {
				devEUI : EUI_me,
				rssi: -16,
				temperature : 28,
				battery : 3300
			}
		};
		client.publish("devices/"+PROTOCOL+"/"+EUI_me+"/miso", JSON.stringify(data_GPIO));
	} else if ((m.indexOf("pump ") !=-1)&&(m.indexOf("wind ") !=-1)) {
		GPIO[0] = Number(m[m.indexOf("wind ")+5]); //devices/lora/807B85902000021C/miso
		GPIO[1] = Number(m[m.indexOf("pump ")+5]); //wind 0, pump 1
	}
}
function onConnected() {
	setInterval(sendData, TIMER_INTERVAL);
	client.subscribe("devices/"+PROTOCOL+"/"+EUI_me+"/#");
}
const minTemp = 31;
const maxTemp = 45;
const minMois = 25;
const maxMois = 48;
var time = 5;
var fl_t = 0;
var fl_m = 0;
var plant = 5;
var wind = 0, flow = 0;
var t1 = 40, t2 = 40, m1 = 40, m2 = 40;
/*function window (te){
	if (te >= maxTemp) {wind=1}
	else if (te <= minTemp) {wind=0}
	return wind;
}
function stream (ms){
	if (ms >= maxMois) {flow=0}
	else if (ms <= minMois) {flow=1}
	return flow;
}*/
function temperature() { 
	if (fl_t == 1){
	    t2 = ((plant-/*window(t1)*/GPIO[0]*4)*19-2*t1)*time/2000 + t1;
	    fl_t = 0;
	    return t2;
	    }
	else {
	    t1 = ((plant-/*window(t2)*/GPIO[0]*4)*19-2*t2)*time/2000 + t2;
		fl_t = 1;
		return t1;
		}
}
function moisture() { 
	if (fl_m == 1){
	    m2 = ((-plant+(/*stream(m1)*/+5)*GPIO[1]*5)*20-2*m1)*time/1500 + m1;
		fl_m = 0;
		return m2;
		}
	else {
	    m1 = ((-plant+(/*stream(m2)*/+5)*GPIO[1]*5)*20-2*m2)*time/1500 + m2;
	    fl_m = 1;
	    return m1;
		}
}
var te, ms;
function sendData() {
	var data_ADC = {
		data : {
			adc2: Math.floor(moisture()),
			adc3: Math.floor(temperature())
		},
		status : {
			devEUI : EUI_ADC,
			rssi: -16,
			temperature : 30,
			battery : 3300
		}
	};
	var mADC = JSON.stringify(data_ADC);
	console.log('Sending: ' + mADC)
	client.publish("devices/"+PROTOCOL+"/"+EUI_ADC+"/miso/adc", mADC);
}






