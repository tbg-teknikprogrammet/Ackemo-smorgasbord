/**************************Analog Clock******************************/
var canvas = document.getElementById('canvasClock');
var ctx = canvas.getContext('2d'); // ctx = context
var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.9;
setInterval(drawClock, 1000); // put in the one second timer til it will move

function drawClock() {
	// function to draw everything on the clock
	drawFace(ctx, radius);
	drawNumbers(ctx, radius);
	drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
	var grad;
	ctx.beginPath();
	ctx.arc(0, 0, radius, 0, 2 * Math.PI); // arc is the "draw a circle" function in a canvas
	ctx.fillStyle = 'white';
	ctx.fill();
	grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05); // it's a gradient on the outerside of the clock, but i kept to one colour
	grad.addColorStop(1, 'grey');
	ctx.strokeStyle = grad;
	ctx.lineWidth = radius * 0.1;
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI); // small circle in the middle of the clock
	ctx.fillStyle = 'grey';
	ctx.fill();
}
function drawNumbers(ctx, radius) {
	var ang;
	var num;
	ctx.font = radius * 0.15 + 'px arial'; // font size and family of the numbers on the clock
	ctx.textBaseline = 'middle';
	ctx.textAlign = 'center';
	for (num = 1; num < 13; num++) {
		// puts out the numbers between 1-12 gradially around the clock.
		ang = num * Math.PI / 6;
		ctx.rotate(ang);
		ctx.translate(0, -radius * 0.85);
		ctx.rotate(-ang);
		ctx.fillText(num.toString(), 0, 0);
		ctx.rotate(ang);
		ctx.translate(0, radius * 0.85);
		ctx.rotate(-ang);
	}
}

function drawTime(ctx, radius) {
	var now = new Date();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	//hour
	hour = hour % 12;
	hour = hour * Math.PI / 6 + minute * Math.PI / (6 * 60) + second * Math.PI / (360 * 60);
	drawHand(ctx, hour, radius * 0.5, radius * 0.07);
	//minute
	minute = minute * Math.PI / 30 + second * Math.PI / (30 * 60);
	drawHand(ctx, minute, radius * 0.8, radius * 0.07);
	// second
	second = second * Math.PI / 30;
	drawHand(ctx, second, radius * 0.9, radius * 0.02);
}

function drawHand(ctx, pos, length, width) {
	ctx.beginPath();
	ctx.lineWidth = width;
	ctx.lineCap = 'round';
	ctx.moveTo(0, 0);
	ctx.rotate(pos);
	ctx.lineTo(0, -length);
	ctx.stroke();
	ctx.rotate(-pos);
}
/*********************************************************************/

/**************************Lightbox**********************************/
document.getElementById('clickme').addEventListener('click', function() {
	document.getElementById('lightbox').className = 'open';
});

document.getElementById('close').addEventListener('click', function() {
	document.getElementById('lightbox').className = '';
});

document.getElementById('lightbox').addEventListener('click', function(e) {
	if (e.target.id == 'lightbox') {
		document.getElementById('lightbox').className = '';
	}
});

/********************************************************************/

/**********************Calculator*************************************/
const calculator = {
	displayValue: '0',
	firstOperand: null,
	waitingForSecondOperand: false,
	operator: null
};

function inputDigit(digit) {
	const { displayValue, waitingForSecondOperand } = calculator;

	if (waitingForSecondOperand === true) {
		calculator.displayValue = digit;
		calculator.waitingForSecondOperand = false;
	} else {
		calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
	}
}

function inputDecimal(dot) {
	if (calculator.waitingForSecondOperand === true) return;

	// If the displayValue doesn't contain a decimal point
	if (!calculator.displayValue.includes(dot)) {
		// Append the decimal point
		calculator.displayValue += dot;
	}
}

function handleOperator(nextOperator) {
	const { firstOperand, displayValue, operator } = calculator;
	const inputValue = parseFloat(displayValue);

	if (operator && calculator.waitingForSecondOperand) {
		calculator.operator = nextOperator;
		return;
	}

	if (firstOperand == null) {
		calculator.firstOperand = inputValue;
	} else if (operator) {
		const currentValue = firstOperand || 0;
		const result = performCalculation[operator](currentValue, inputValue);

		calculator.displayValue = String(result);
		calculator.firstOperand = result;
	}

	calculator.waitingForSecondOperand = true;
	calculator.operator = nextOperator;
}
const performCalculation = {
	'/': (firstOperand, secondOperand) => firstOperand / secondOperand,

	'*': (firstOperand, secondOperand) => firstOperand * secondOperand,

	'+': (firstOperand, secondOperand) => firstOperand + secondOperand,

	'-': (firstOperand, secondOperand) => firstOperand - secondOperand,

	'=': (firstOperand, secondOperand) => secondOperand
};

function resetCalculator() {
	calculator.displayValue = '0';
	calculator.firstOperand = null;
	calculator.waitingForSecondOperand = false;
	calculator.operator = null;
}

function updateDisplay() {
	const display = document.querySelector('.calculator-screen');
	display.value = calculator.displayValue;
}

updateDisplay();

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
	const { target } = event;
	if (!target.matches('button')) {
		return;
	}

	if (target.classList.contains('operator')) {
		handleOperator(target.value);
		updateDisplay();
		return;
	}

	if (target.classList.contains('decimal')) {
		inputDecimal(target.value);
		updateDisplay();
		return;
	}

	if (target.classList.contains('clear')) {
		resetCalculator();
		updateDisplay();
		return;
	}

	inputDigit(target.value);
	updateDisplay();
});
/*********************************************************************/

/********************************Darkmode*****************************/
function toggleDarkLight() {
	var body = document.getElementById('body');
	var currentClass = body.className;
	body.className = currentClass == 'dark-mode' ? 'light-mode' : 'dark-mode';
}

/*********************************************************************/

/********************************Images*******************************/
var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
	showDivs((slideIndex += n));
}

function showDivs(n) {
	var i;
	var x = document.getElementsByClassName('pic');
	if (n > x.length) {
		slideIndex = 1;
	}
	if (n < 1) {
		slideIndex = x.length;
	}
	for (i = 0; i < x.length; i++) {
		x[i].style.display = 'none';
	}
	x[slideIndex - 1].style.display = 'block';
}
/*********************************************************************/

/********************************Shroom*******************************/
var shrooms = 0;
var shroomsPS = 0;
var shroomsPC = 1;
var pickerCost = 5;
var powerCost = 10;
var amount = document.getElementById('ttlClicks');
var mushroomPsTxt = document.getElementById('shroomsPsTxt');
var mushroom = document.getElementById('mushPic');
var picker = document.getElementById('picker');
var pickerTxt = document.getElementById('picker_cost');
var power = document.getElementById('power');
var powerTxt = document.getElementById('power_cost');
var start = false;
var end = false;
var high = false;
picker.disabled = true;
power.disabled = true;

mushroom.addEventListener('click', function() {
	shrooms += shroomsPC;
});

picker.addEventListener('click', function() {
	shroomsPS += 1;
	shrooms -= pickerCost;
	pickerCost = pickerCost * 1.5;
});

power.addEventListener('click', function() {
	shroomsPC += 2;
	shroomsPS += 5;
	shrooms -= powerCost;
	powerCost = powerCost * 3;
});

setInterval(function totShrooms() {
	amount.innerHTML = shrooms;
	pickerTxt.innerHTML = pickerCost;
	powerTxt.innerHTML = powerCost;
	mushroomPsTxt.innerHTML = 'You earn ' + shroomsPS + ' per second!';
	shrooms = parseInt(shrooms);
	pickerCost = parseInt(pickerCost);
	powerCost = parseInt(powerCost);
	if (pickerCost > shrooms) picker.disabled = true;
	else {
		picker.disabled = false;
	}
	if (powerCost > shrooms) power.disabled = true;
	else {
		power.disabled = false;
	}
}, 1);

setInterval(function shroomPS() {
	shrooms += shroomsPS;
}, 1000);
/*********************************************************************/
