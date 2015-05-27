window.onload = function () {
	var canvas,
		ctx,
		angulo,
		cor,
		cores,
		primarias;

	canvas = document.getElementById("palette");
	ctx = canvas.getContext("2d");

	primarias = [
		new RGB(255, 0, 0),
		new RGB(0, 255, 0),
		new RGB(0, 0, 255),
	];

	cores = 3;

	angulo = (2 * Math.PI) / cores;

	for (cor = 0; cor < cores; cor += 1) {
		paletteColor(primarias[cor], cor * angulo);
	}

	function paletteColor(cor, start) {
		ctx.fillStyle = cor.toColorString();

		ctx.beginPath();
		//ctx.moveTo(150, 150);
		ctx.arc(150, 150, 60, start, start + angulo, false);
		ctx.arc(150, 150, 120, start + angulo, start, true);
		ctx.closePath();
		ctx.fill();
	}
};

var RGBA = (function () {
	RGBA.prototype.toColorString = function toColorString() {
		return "#" +
			toHexString(this.r) +
			toHexString(this.g) +
			toHexString(this.b);
	};

	return RGBA;
	
	function RGBA(r, g, b, a) {
		this.r = r;
		this.g = g;
		this.b = b;
		this.a = a;
	}

	function toHexString(number) {
		return ("0" + number.toString(16)).slice(-2);
	}
}());

var RGB = (function () {
	RGB.prototype = Object.create(RGBA.prototype);
	RGB.prototype.constructor = RGB;

	return RGB;

	function RGB(r, g, b) {
		RGBA.call(this, r, g, b, 255);
	}
}());
