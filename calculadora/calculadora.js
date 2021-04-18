const display = document.querySelector('.caculator__display');
const keyNumbers = document.querySelectorAll('.key--number');
const keyClear = document.querySelector('.key--clear');
const keyOperators = document.querySelectorAll('.key--operator');
const keyDecimal = document.querySelector('.key--decimal');
const keyEqual = document.querySelector('.key--equal');

let firstNumber;
let operatorClicked;
let lastKeyType;

setInitialState();

function setInitialState() {
	display.textContent = 0;
	firstNumber = '';
	operatorClicked = '';
	lastKeyType = '';
}

function calculate(operator, firstValue, secondValue) {
	let res = 0;
	switch (operator) {
		case 'add':
			res = firstValue + secondValue;
			break;
		case 'subtract':
			res = firstValue - secondValue;
			break;
		case 'multiply':
			res = firstValue * secondValue;
			break;
		case 'divide':
			res = firstValue / secondValue;
			break;
	}
	return res;
}

function displayTotal() {
	display.textContent = calculate(
		operatorClicked,
		Number(firstNumber),
		Number(display.textContent)
	);
}

keyNumbers.forEach((key) => {
	key.addEventListener('click', (event) => {
		if (
			display.textContent === '0' ||
			lastKeyType === 'operator' ||
			lastKeyType === 'equal'
		) {
			display.textContent = event.target.textContent;
		} else {
			display.textContent += event.target.textContent;
		}
		if (lastKeyType === 'equal') {
			firstNumber = '';
		}
		lastKeyType = 'number';
	});
});

keyDecimal.addEventListener('click', () => {
	if (lastKeyType === 'operator' || lastKeyType === 'equal') {
		display.textContent = '0.';
		firstNumber = '';
	} else if (!display.textContent.includes('.')) {
		display.textContent += '.';
	}
	lastKeyType = 'decimal';
});

keyOperators.forEach((key) => {
	key.addEventListener('click', (event) => {
		if (
			firstNumber &&
			operatorClicked &&
			lastKeyType !== 'operator' &&
			lastKeyType !== 'equal'
		) {
			displayTotal();
		}
		firstNumber = display.textContent;
		operatorClicked = event.target.dataset.action;
		lastKeyType = 'operator';
	});
});

keyClear.addEventListener('click', () => {
	setInitialState();
	lastKeyType = 'clear';
});

keyEqual.addEventListener('click', () => {
	if (firstNumber && lastKeyType !== 'equal' && lastKeyType !== 'operator') {
		displayTotal();
	}
	lastKeyType = 'equal';
});
