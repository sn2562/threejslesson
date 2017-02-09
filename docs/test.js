	//var STATE = { NONE: - 1, ROTATE: 0, ZOOM: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_ZOOM_PAN: 4 };
	this.changeState = function (number) {
		console.log("change!");
		_state = number;
	}