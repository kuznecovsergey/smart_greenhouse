
var plot = {
	
	init: function() {
		this.initPlot1();
		this.initPlot2();

		this.updatePlots();
	},

	initPlot1: function() {
		var groups = new vis.DataSet([
			{id: 0, content: 'Влажность'},
			{id: 1, content: 'Температура'}
		]);
				  
		var container = document.getElementById('plot1-wrapper');
		this.dataset1 = new vis.DataSet();

		var options = {
			legend: true,  
			height: container.clientHeight, 
			dataAxis: { 
				left: {
					range: {
						min: 0, max: 100
					}
				}
			}
		};
		var graph2d = new vis.Graph2d(container, this.dataset1, groups, options);
	},

	initPlot2: function() {
		var groups = new vis.DataSet([
			{id: 0, content: 'Окно'},
			{id: 1, content: 'Клапан'}
		]);
				  
		var container = document.getElementById('plot2-wrapper');
		this.dataset2 = new vis.DataSet();

		var options = {
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
		var graph2d = new vis.Graph2d(container, this.dataset2, groups, options);
	},

	updatePlots: function() { 
		this.dataset1.add({
			x: 1,
			y: 2,
			group: 0
		});	

		this.dataset1.add({
			x: 1,
			y: 2,
			group: 1
		});	

		this.dataset2.add({
			x: 1,
			y: 2,
			group: 0
		});	

		this.dataset2.add({
			x: 1,
			y: 2,
			group: 1
		});	

	}

}
