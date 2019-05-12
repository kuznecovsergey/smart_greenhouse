
var plot = {
	
	init: function() {
		this.initPlot1();
		this.initPlot2();

		//this.startUpdate();
	},

	initPlot1: function() {
		var groups = new vis.DataSet([
			{id: 0, content: 'Температура'},
			{id: 1, content: 'Влажность'}
		]);
				  
		var container = document.getElementById('plot1-wrapper');
		this.dataset1 = new vis.DataSet();

		var options = {
			start: vis.moment(),
			end: vis.moment().add(10, 'seconds'),
			legend: true,  
			height: container.clientHeight, 
			dataAxis: { 
				left: {
					range: {
						min: 0, max: 200
					}
				}
			}
		};
		this.graph1 = new vis.Graph2d(container, this.dataset1, groups, options);
	},

	initPlot2: function() {
		var groups = new vis.DataSet([
			{id: 0, content: 'Окно'},
			{id: 1, content: 'Клапан'}
		]);
				  
		var container = document.getElementById('plot2-wrapper');
		this.dataset2 = new vis.DataSet();

		var options = {
			start: vis.moment(),
			end: vis.moment().add(10, 'seconds'),
			legend: true,  
			height: container.clientHeight, 
			dataAxis: { 
				left: {
					range: {
						min: 0, max: 2
					}
				}
			}
		};
		this.graph2 = new vis.Graph2d(container, this.dataset2, groups, options);
	},

	startUpdate: function() {
		var self = this;

		function renderStep() {
			var now = vis.moment();

			var range = self.graph1.getWindow();
			var interval = range.end - range.start;
			self.graph1.setWindow(now - interval, now, {animation: false});

			var range = self.graph2.getWindow();
			var interval = range.end - range.start;
			self.graph2.setWindow(now - interval, now, {animation: false});

			requestAnimationFrame(renderStep);
		}
		renderStep();
	},

	updatePlots: function(state) { 
		this.dataset1.add({
			x: state.tmp.date,
			y: state.tmp.value,
			group: 0
		});	

		this.dataset1.add({
			x: state.humidity.date,
			y: state.humidity.value,
			group: 1
		});	

		this.dataset2.add({
			x: state.window.date,
			y: state.window.value,
			group: 0
		});	

		this.dataset2.add({
			x: state.valve.date,
			y: state.valve.value,
			group: 1
		});	

		var range = this.graph1.getWindow();
		var interval = range.end - range.start;
		this.graph1.setWindow(state.tmp.date - interval, state.tmp.date, {animation: false});

		var range = this.graph2.getWindow();
		var interval = range.end - range.start;
		this.graph2.setWindow(state.window.date - interval, state.window.date, {animation: false});

	}

}
