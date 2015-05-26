var canvas,
	ctx,
	angulo,
	cor,
	cores,
	primarias;

canvas = document.getElementById("palette");
ctx = canvas.getContext("2d");

primarias = [
	"#FF0000",
	"#00FF00",
	"#0000FF"
];

cores = 3;

angulo = (2 * Math.PI) / cores;

for (cor = 0; cor < cores; cor += 1) {
	paletteColor(primarias[cor], cor * angulo);
}

function paletteColor(cor, start) {
	ctx.fillStyle = cor;

	ctx.beginPath();
	//ctx.moveTo(150, 150);
	ctx.arc(150, 150, 60, start, start + angulo, false);
	ctx.arc(150, 150, 120, start + angulo, start, true);
	ctx.closePath();
	ctx.fill();
}
