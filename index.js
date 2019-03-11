var PROTOCOL = 'lora';
var SRV_PORT = 8070;
//var DB_NAME = ':memory:';
var DB_NAME = 'smartgarden.db';

var MQTT_ADDRESS = 'localhost';
var MQTT_PORT = 1883;
var MQTT_CLIENT = 'smartgarden_server';

var APP_MODULES = [
	'devices/'+PROTOCOL+'/807B85902000021E',
	'devices/'+PROTOCOL+'/807B85902000032D',
];
var GPIO_MODULE = 'devices/'+PROTOCOL+'/807B85902000021C';

var GPIO_MAP = {
	light: {port: 17, state: -1},
	pump: {port: 16, state: -1},
	auto: {port: -1, state: 0}
};


var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var sql = require('sqlite3').verbose();
var db = new sql.Database(DB_NAME);
db.serialize(function() {
	db.run("CREATE TABLE IF NOT EXISTS temperature (time INT, value INT)");
	db.run("CREATE TABLE IF NOT EXISTS humidity (time INT, value INT)");
	db.run("CREATE TABLE IF NOT EXISTS luminosity (time INT, value INT)");
});

var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://'+MQTT_ADDRESS+':'+MQTT_PORT, MQTT_CLIENT);
client.on('connect', onConnected);
client.on('message', onMessageReceived);



var app = express();

app.use(express.static('garden'));
app.get('/', express.static('garden'));
app.get('/get/:value', get);
app.get('/get/:value/:mode', get);
app.get('/get/:value/:mode/:days', get);
app.get('/cmd/:command/:value', cmd);
app.listen(SRV_PORT);



function subscribeModule(topic) {
	client.subscribe(topic + '/miso/#');
}

function onMessageReceived(topic, message) {
	//console.log('> onMessageReceived: ' + message);
	try {
		var m = message.toString().replace(/([\d]),([\s]*\])/g, '$1$2');
		m = JSON.parse(m);
		if (m.data !== undefined) {
			var val = undefined;
			var t = undefined;
			if (m.data.adc2 !== undefined) {
				t = 'humidity';
				val = m.data.adc2.toString();
				//val = Math.floor(100-(parseInt(m.data.adc2.toString())-590)/910*100);
				if (val > 100) val = 100;
				if (val < 0) val = 0;
				db.run("INSERT INTO " + t + " VALUES ("+now()+", "+val+")");
			}
			if (m.data.adc3 !== undefined) {
				t = 'temperature';
				val = m.data.adc3.toString();
				//val = Math.floor((parseInt(m.data.adc3.toString())-750)/10+21);
				db.run("INSERT INTO " + t + " VALUES ("+now()+", "+val+")");
			}
			if (m.data.luminocity !== undefined) {
				t = 'luminosity';
				//val = m.data.luminocity.toString();
				val = Math.floor(Math.log(parseInt(m.data.luminocity.toString())+1)*10);
				db.run("INSERT INTO " + t + " VALUES ("+now()+", "+val+")");
			}

			if (m.data.gpios !== undefined) {
				for(var cmd in GPIO_MAP) {
					if (GPIO_MAP[cmd].port > -1) {
						GPIO_MAP[cmd].state = parseInt(m.data.gpios[GPIO_MAP[cmd].port]);
					}
				};
			}
		} else {
			console.log('No data found: ' + m.toString());
		}
	} catch (e) {
		console.log('Invalid JSON: ' + message + e);
	}
	
}
function onConnected() {
	subscribeModule(GPIO_MODULE);
	APP_MODULES.forEach(subscribeModule);

	var topic = GPIO_MODULE + '/mosi/gpio';
	var msg = 'get all';
	client.publish(topic, msg.toString());
}




function now(dayshift) {
	var days = Math.floor(Date.now()/1000);
	if (typeof dayshift === "number" || typeof dayshift === 'string') {
		days += parseInt(dayshift)*86400;
	}
	return days;
}

function index(req, res) {
	res.send('INDEX');
}

function get(req, res) {
	var p = req.params;

	try {
		switch (p.value) {
			case "latest":
/**/
				db.get("SELECT humidity.value as Hv, humidity.time as Ht, \
					temperature.value as Tv, temperature.time as Tt, \
					luminosity.value as Lv, luminosity.time as Lt FROM humidity \
					LEFT JOIN temperature ON temperature.time = (SELECT max(time) FROM temperature) \
					LEFT JOIN luminosity ON luminosity.time = (SELECT max(time) FROM luminosity) \
					WHERE humidity.time=(SELECT max(time) FROM humidity)", function(err, row) {

					var data = {
						history : {
							temperature : null,				
							humidity : null,
							luminosity : null
						},
						status : GPIO_MAP
					};
					if (row !== undefined) {
						console.log(JSON.stringify(row));
						data.history.temperature = {time : row.Tt, value: row.Tv};				
						data.history.humidity = {time : row.Ht, value: row.Hv};
						data.history.luminosity = {time : row.Lt, value: row.Lv};
						res.json(data);	
					} else {
						console.error('Error:',err);
						res.status(200).json(data);
						return;
					}
				});

				break;
			case "data":
				var mode = '';
				switch (p.mode) {
					case 'temperature': case 'humidity': case 'luminosity': mode = p.mode; break;
					default:
						res.status(404).json({error:404});
						return;
				}

				if (typeof p.days !== 'undefined') {
					var limit = parseInt(p.days.toString());
				}

				db.all("SELECT * FROM " + mode + " ORDER BY time DESC" + (limit ? " LIMIT "+limit : ''), function(err, rows) {
					res.json(rows);
				});
				break;
			default:
				res.status(404).json({error:404});
				return;	
		}
	} catch (e) {
		console.log('Invalid parameter');
	}
}

function cmd(req, res) {
	var p = req.params;

	try {
		switch (p.command) {
			/*
			 * Implement command execution depending on p.command. It can be commands to switch light, pump and auto-regulation mode on/off.
			 * Use GPIO_MODULE + '/mosi/gpio' topic change GPIO pin state.
			 */
			// case <value>:
			default:
				res.status(404).json({error:404});
				return;	
		}
	} catch (e) {
		console.log('Wrong command');
	}
}


