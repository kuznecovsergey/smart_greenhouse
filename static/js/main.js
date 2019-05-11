var dataset;
var MANUAL=0;
var AUTO=1;

var mode=0; //0 is manual, 1 is automatic
var Status = undefined;

var HISTORY_LIMIT = 10;
var TIMER_INTERVAL = 1000*2 // 2 sec

var timerRequest = undefined;
var dataGroups = {
	humidity: 0,
	temperature: 1,
	luminosity: 2
};

function init_graph() {
	var groups = new vis.DataSet([
	{id: 0, content: 'Влажность'},
	{id: 1, content: 'Температура'},
	{id: 2, content: 'Освещенность'}
	]);
		  
	var container = document.getElementById('visualization');
	dataset = new vis.DataSet();
	var options = {
		legend: true,  
		//height: 500, 
		dataAxis: { 
			left: {
				range: {
					min:0, max: 100
				}
			}
		}
	};
	var graph2d = new vis.Graph2d(container, dataset, groups, options);
}

function showStatus(type, value) {
	switch (type) {
		case "auto":
			var val = ["Manual", "Auto"];
			$("#str-"+type).text(val[value]);
			break;
		default:
			$("#str-"+type).text(value);
	}
	
}

function setButtonState(mode, state)
{
	var b = $("#btn-"+mode);
	switch (state) {
		case 0:
			b.removeClass("btn-disabled");
			b.removeClass("btn-on");
			break;
		case 1:
			b.removeClass("btn-disabled");
			b.addClass("btn-on");
			break;
		default:
			b.addClass("btn-disabled");
	}
}

function toggleCmd(cmd) {

	if (typeof Status !== 'undefined') {
		var val = Status[cmd].state;
		if (val != -1) {
			val = val == 0 ? 1 : 0;
			var url = '/cmd/'+cmd+'/'+val;

			var data = {
				url : url,
				method: "GET",  
				error: onError,
				timeout: 5000,
				cache: false
			};

			data.success = function(d) { 
				if (d && d.result == 'OK') {
					Status[cmd].state = this.success.val;
					setButtonState(cmd, this.success.val);
					showStatus(cmd, this.success.val);
				}
			};
			data.success.val = val;
			$.ajax(data);
	
	
		}
	}
}

function toggleLight() {	
	toggleCmd('light');
}

function togglePump() {	
	toggleCmd('pump');	
}

function toggleMode() {
	toggleCmd('auto');
}


function onError() {

}



function onGetLatest(data, s, x) {

    console.log(data)

	if (data != undefined) {
		console.log(data);
		if (data.history != undefined) for (var type in dataGroups) {

			if (data.history[type] != null) {
				dataset.add({
					x: data.history[type].time * 1000,
					y: data.history[type].value,
					group: dataGroups[type]
				});	
			}

			showStatus(type, data.history[type].value);
		}	
		if (data.status != undefined) {
			Status = data.status;
			for (var mode in data.status) {
				setButtonState(mode, data.status[mode].state);
				showStatus(mode, data.status[mode].state);
			}
		}	
	}
}

function onGetHistory(data, type) {
	if (data.length != undefined) {
		data.forEach(function(p) {
			dataset.add({
				x: p.time * 1000,
				y: p.value,
				group: dataGroups[type]
			});
		});
	}
}

function requestLatest() {
	$.ajax({
		method: "GET",
		url: '/get/latest',  
		success: onGetLatest, 
		error: onError,
		timeout: 5000,
		cache: false
	});
}

function requestHistory() {
	var data = {
		method: "GET",  
		error: onError,
		timeout: 5000,
		cache: false
	};

	for (var group in dataGroups) {
		data.url = '/get/data/' + group + '/' + HISTORY_LIMIT;
		data.success = function(d) { onGetHistory(d, this.success.group);}
		data.success.group = group;
		$.ajax(data);
	}
	
}


$(document).ready( function() {
	init_graph();

	requestHistory();
	timerRequest = setInterval(requestLatest, TIMER_INTERVAL);
});



function control_humidity(humidity) {

}

