const display = document.querySelector('.caculator__display');
const keyNumbers = document.querySelectorAll('.key--number');
const keyClear = document.querySelector('.key--clear');
const keyOperators = document.querySelectorAll('.key--operator');
const keyDecimal = document.querySelector('.key--decimal');
const keyEqual = document.querySelector('.key--equal');

const DISPLAY_INIT_STATE = '';
const NUMBER_KEY = 'number';
const OPERATOR_KEY = 'operator';
const EQUAL_KEY = 'equal';
const DECIMAL_KEY = 'decimal';
const MINUS_KEY = 'minus';

changeDisplayContent(DISPLAY_INIT_STATE);
let firstNumber = '';
let operatorClicked = '';
let lastKeyType = '';

function changeDisplayContent(newContent) {
	display.textContent = newContent;
}

function addContentToDisplay(content) {
	display.textContent += content;
}

function getDisplayContent() {
	return display.textContent;
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

	if (!isFinite(res)) {
		return 'Indeterminado';
	}

	return res;
}

function displayTotal() {
	const total = calculate(
		operatorClicked,
		Number(firstNumber),
		Number(getDisplayContent())
	);

	changeDisplayContent(total);
}

keyNumbers.forEach((key) => {
	key.addEventListener('click', (event) => {
		if (
			lastKeyType !== MINUS_KEY &&
			(getDisplayContent() === DISPLAY_INIT_STATE ||
				lastKeyType === OPERATOR_KEY ||
				lastKeyType === EQUAL_KEY)
		) {
			changeDisplayContent(event.target.textContent);
		} else {
			addContentToDisplay(event.target.textContent);
		}

		if (lastKeyType === EQUAL_KEY) {
			firstNumber = '';
		}

		lastKeyType = NUMBER_KEY;
	});
});

keyDecimal.addEventListener('click', () => {
	if (lastKeyType === OPERATOR_KEY || lastKeyType === EQUAL_KEY) {
		changeDisplayContent('0.');
		firstNumber = '';
	} else if (lastKeyType === MINUS_KEY) {
		changeDisplayContent('-0.');
	} else if (!getDisplayContent().includes('.')) {
		addContentToDisplay('.');
	}

	lastKeyType = DECIMAL_KEY;
});

keyOperators.forEach((key) => {
	key.addEventListener('click', (event) => {
		if (
			event.target.dataset.action === 'subtract' &&
			(lastKeyType === '' || lastKeyType === OPERATOR_KEY)
		) {
			changeDisplayContent('-');
			lastKeyType = MINUS_KEY;
			return;
		}

		if (
			firstNumber &&
			operatorClicked &&
			lastKeyType !== OPERATOR_KEY &&
			lastKeyType !== EQUAL_KEY &&
			lastKeyType !== MINUS_KEY
		) {
			displayTotal();
		}

		// Avoid operations if the calculator doesn't have a valid operation on input
		if (
			getDisplayContent() !== DISPLAY_INIT_STATE &&
			getDisplayContent() !== '-'
		) {
			firstNumber = getDisplayContent();
			operatorClicked = event.target.dataset.action;
			lastKeyType = OPERATOR_KEY;
		}
	});
});

keyClear.addEventListener('click', () => {
	changeDisplayContent(DISPLAY_INIT_STATE);
	firstNumber = '';
	operatorClicked = '';
	lastKeyType = '';
});

keyEqual.addEventListener('click', () => {
	if (
		firstNumber &&
		lastKeyType !== EQUAL_KEY &&
		lastKeyType !== OPERATOR_KEY
	) {
		displayTotal();
	}

	lastKeyType = EQUAL_KEY;
});