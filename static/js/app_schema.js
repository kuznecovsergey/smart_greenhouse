
scheme = {
	init: function() {
		this.labelValve   = document.getElementById("label-valve");
		this.labelWindow  = document.getElementById("label-window");
		this.labelTemp    = document.getElementById("label-temp");
		this.labelHum     = document.getElementById("label-hum");
		this.labelMide    = document.getElementById("label-mode");

		this.buttonValve  = document.getElementById("button-valve");
		this.buttonWindow = document.getElementById("button-window");
		this.buttonMode   = document.getElementById("button-mode");

		this.mode = undefined;

		this.updateMode("wrong");
		this.updateWindowLabel("wrong");
		this.updateValveLabel("wrong");
		this.updateTempLabel(undefined);
		this.updateHumLabel(undefined);
	},

	updateValveLabel: function(valveText) {
		if (valveText == "1.0") {
			this.labelValve.innerHTML = "Открыт";
			this.labelValve.style.color = "rgb(41, 154, 41)";

			if (this.mode == "manual") {
				this.buttonValve.innerHTML = "Закрыть";
				this.buttonValve.style.background = "rgb(41, 154, 41)";
			}

		} else if (valveText == "0.0") {
			this.labelValve.innerHTML = "Закрыт";
			this.labelValve.style.color = "#d49503";

			if (this.mode == "manual") {		
				this.buttonValve.innerHTML = "Открыть";
				this.buttonValve.style.background = "rgb(41, 154, 41)";
			}

		} else {
			this.labelValve.innerHTML = "???";
			this.labelValve.style.color = "red";
		}
	},

	updateWindowLabel: function(windowText) {
		if (windowText == "1.0") {
			this.labelWindow.innerHTML = "Открыто";
			this.labelWindow.style.color = "rgb(41, 154, 41)";

			if (this.mode == "manual") {
				this.buttonWindow.innerHTML = "Закрыть";
				this.buttonWindow.style.background = "rgb(41, 154, 41)";
			}

		} else if (windowText == "0.0") {
			this.labelWindow.innerHTML = "Закрыто";
			this.labelWindow.style.color = "#d49503";

			if (this.mode == "manual") {		
				this.buttonWindow.innerHTML = "Открыть";
				this.buttonWindow.style.background = "rgb(41, 154, 41)";
			}

		} else {
			this.labelWindow.innerHTML = "???";
			this.labelWindow.style.color = "red";
		}
	},

	updateTempLabel: function(tempText) {
		if (tempText != undefined) {
			this.labelTemp.innerHTML = tempText + " C";
			this.labelTemp.style.color = "black";
		} else {
			this.labelTemp.innerHTML = "???";
			this.labelTemp.style.color = "red";
		}
	},

	updateHumLabel: function(humText) {
		if (humText != undefined) {
			this.labelHum.innerHTML = humText + " %";
			this.labelHum.style.color = "black";
		} else {
			this.labelHum.innerHTML = "???";
			this.labelHum.style.color = "red";
		}
	},

	updateMode: function(modeText) {
		if (modeText == "manual") {
			this.mode = modeText;
			this.labelMide.innerHTML = "Ручной";
			this.buttonWindow.style.background = "rgb(41, 154, 41)";

			this.buttonMode.innerHTML = "В автомат";
			this.buttonMode.style.background = "rgb(41, 154, 41)";

		} else if (modeText == "auto") {
			this.mode = modeText;
			this.labelMide.innerHTML = "Автоматический";
			this.buttonWindow.style.background = "rgb(41, 154, 41)";

			this.buttonValve.innerHTML = "Недоступно";
			this.buttonValve.style.background = "#EFEFEF";

			this.buttonWindow.innerHTML = "Недоступно";
			this.buttonWindow.style.background = "#EFEFEF";

			this.buttonMode.innerHTML = "В ручной";
			this.buttonMode.style.background = "rgb(41, 154, 41)";

		} else {
			this.mode = undefined;

			this.labelMide.innerHTML = "???";
			this.buttonWindow.style.background = "red";

			this.buttonMode.innerHTML = "Недоступно";
			this.buttonMode.style.background = "#EFEFEF";

			this.buttonValve.innerHTML = "Недоступно";
			this.buttonValve.style.background = "#EFEFEF";

			this.buttonWindow.innerHTML = "Недоступно";
			this.buttonWindow.style.background = "#EFEFEF";
		}
	}, 

	initButtonEvents: function() {

	}
}
