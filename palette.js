window.onload = function () {
	var canvas,
		ctx,
		angle,
		color,
		colorCount,
		primaries,
		colors;

	canvas = document.getElementById("palette");
	ctx = canvas.getContext("2d");

	canvas.addEventListener("click", function canvasClick(ev) {
	});

	primaries = [
		new RGB(255, 0, 0),
		new RGB(0, 255, 0),
		new RGB(0, 0, 255),
	];

	colorCount = 12;

	colors = generateColors(primaries, colorCount);

	angle = (2 * Math.PI) / colorCount;

	for (color = 0; color < colorCount; color += 1) {
		paletteColor(colors[color].toColorString(), color * angle);
	}

	function generateColors(primaries, totalColors) {
		var skip,
			color,
			colors;

		colors = [];
		skip = totalColors / 3;

		for (color = 0; color < 3; color += 1) {
			colors[color * skip] = primaries[color];
		}

		for (; skip > 1; skip /= 2) {
			for (color = 0; color < totalColors; color += skip) {
				colors[color + (skip / 2)] = RGB.mix(colors[color], colors[(color + skip) % totalColors]);
			}
		}

		return colors;
	}

	function paletteColor(color, start) {
		ctx.fillStyle = color;

		ctx.beginPath();
		//ctx.moveTo(150, 150);
		ctx.arc(150, 150, 60, start, start + angle, false);
		ctx.arc(150, 150, 120, start + angle, start, true);
		ctx.closePath();
		ctx.fill();
	}
};

var RGB = (function () {
	RGB.prototype.toColorString = function toColorString() {
		return "#" +
			toHexString(this.r) +
			toHexString(this.g) +
			toHexString(this.b);
	};

	RGB.mix = function (colorA, colorB) {
		var r, b, g;

		if (!(colorA instanceof RGB) || !(colorB instanceof RGB)) {
			throw new Error("Can only mix RGB colors!");
		}

		r = Math.floor(Math.sqrt((Math.pow(colorA.r, 2) + Math.pow(colorB.r, 2)) / 2));
		g = Math.floor(Math.sqrt((Math.pow(colorA.g, 2) + Math.pow(colorB.g, 2)) / 2));
		b = Math.floor(Math.sqrt((Math.pow(colorA.b, 2) + Math.pow(colorB.b, 2)) / 2));

		return new RGB(r, g, b);
	};

	return RGB;

	function RGB(r, g, b) {
		this.r = r;
		this.g = g;
		this.b = b;
	}

	function toHexString(number) {
		return ("0" + number.toString(16)).slice(-2);
	}
}());

var RGBA = (function () {
	RGBA.prototype = Object.create(RGB.prototype);
	RGBA.prototype.constructor = RGBA;

	return RGBA;
	
	function RGBA(r, g, b, a) {
		RGB.call(this, r, g, b);
		this.a = a;
	}
}());
