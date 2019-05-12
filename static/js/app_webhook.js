
webhook = {
	intervalMS: 2000,

	init: function() {
		plot.init();
		scheme.init();

		this.startRequestSendingLoop();
	},

	onGetStateSuccess: function() {

	},

	onGetStateWrong: function() {

	},

	startRequestSendingLoop: function() {
		setInterval(function() {

		}, this.intervalMS);
	}
}

webhook.init();

tests = {
	set_wrong_labels_data: function() {
		scheme.updateMode("wrong");
		scheme.updateWindowLabel("wrong");
		scheme.updateValveLabel("wrong");
		scheme.updateTempLabel(undefined);
		scheme.updateHumLabel(undefined);
	},

	set_auto_mode: function() {
		scheme.updateMode("auto");
		scheme.updateWindowLabel("0");
		scheme.updateValveLabel("0");
		scheme.updateTempLabel("23");
		scheme.updateHumLabel("50");
	},

	set_manual_mode: function() {
		scheme.updateMode("manual");
		scheme.updateWindowLabel("1");
		scheme.updateValveLabel("1");
		scheme.updateTempLabel("23");
		scheme.updateHumLabel("50");
	},
}

//tests.set_labels_empty();
//tests.set_auto_mode();
//tests.set_manual_mode();