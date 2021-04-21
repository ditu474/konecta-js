import {
	isAlpha,
	isEmail,
	isIn,
	isLength,
	isMinorTime,
	isMobilePhone,
	isNumeric,
	isTime,
} from './validators.js';

const form = document.getElementById('main-form');
const idNumberInput = document.getElementById('id');
const nameInput = document.getElementById('name');
const celInput = document.getElementById('cel');
const emailInput = document.getElementById('email');
const areaInput = document.getElementById('area');
const cargoInput = document.getElementById('cargo');
const locationInput = document.getElementById('location');
const timeSinceInput = document.getElementById('timeSince');
const timeUntilInput = document.getElementById('timeUntil');
const submitButton = document.getElementById('submit-button');
const dataListLocations = document.getElementById('locations');

const DUMMY_LOCATIONS = ['Antioquia', 'Bogotá', 'Cali', 'Barranquilla'];

DUMMY_LOCATIONS.forEach((location) => {
	const option = document.createElement('option');
	const content = document.createTextNode(location);
	option.appendChild(content);
	option.value = location;
	dataListLocations.appendChild(option);
});

const validatorWrapper = (validator, ...params) => {
	return (val) => validator(val, ...params);
};

const formObject = {
	valid: function () {
		for (const input of this.inputs) {
			if (!input.valid) return false;
		}
		return true;
	},
	element: form,
	inputs: [
		{
			valid: false,
			touched: false,
			element: idNumberInput,
			validators: [
				validatorWrapper(isNumeric),
				validatorWrapper(isLength, { min: 8, max: 11 }),
			],
		},
		{
			valid: false,
			touched: false,
			element: nameInput,
			validators: [
				validatorWrapper(isAlpha),
				validatorWrapper(isLength, { min: 5, max: 30 }),
			],
		},
		{
			valid: false,
			touched: false,
			element: celInput,
			validators: [validatorWrapper(isMobilePhone)],
		},
		{
			valid: false,
			touched: false,
			element: emailInput,
			validators: [validatorWrapper(isEmail)],
		},
		{
			valid: false,
			touched: false,
			element: areaInput,
			validators: [
				validatorWrapper(isAlpha),
				validatorWrapper(isLength, { min: 3 }),
			],
		},
		{
			valid: false,
			touched: false,
			element: cargoInput,
			validators: [
				validatorWrapper(isAlpha),
				validatorWrapper(isLength, { min: 3 }),
			],
		},
		{
			valid: false,
			touched: false,
			element: locationInput,
			validators: [validatorWrapper(isIn, DUMMY_LOCATIONS)],
		},
		{
			valid: false,
			touched: false,
			element: timeSinceInput,
			validators: [
				validatorWrapper(isTime),
				validatorWrapper(isMinorTime, timeUntilInput.value),
			],
		},
		{
			valid: false,
			touched: false,
			element: timeUntilInput,
			validators: [validatorWrapper(isTime)],
		},
	],
};

formObject.inputs.forEach((input) => {
	input.element.addEventListener('change', (evt) => {
		const parent = input.element.parentNode;
		let sibling = input.element.nextSibling;
		while (sibling) {
			const aux = sibling.nextSibling;
			parent.removeChild(sibling);
			sibling = aux;
		}
		const errors = input.validators.map((validator) =>
			validator(evt.target.textContent)
		);
		if (errors.length > 0) {
			input.invalid = false;
			input.element.className = 'input--invalid';
			errors.forEach((err) => {
				const span = document.createElement('span');
				const content = document.createTextNode(err);
				span.appendChild(content);
				span.className = 'input__message--invalid';
				parent.insertBefore(span, input.element.nextSibling);
			});
		} else {
			input.valid = true;
			input.element.className = 'input--valid';
		}
	});
});

form.addEventListener('submit', (event) => {
	event.preventDefault();
	console.log(formObject.valid());
});
