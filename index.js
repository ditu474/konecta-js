import { createConfirmDataModal, createSimpleModal } from './modal.js';
import {
	isEmail,
	isID,
	isIn,
	isLength,
	isMobilePhone,
	isName,
	isNameAndLastName,
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
const dataListLocations = document.getElementById('locations');

const DUMMY_LOCATIONS = ['Antioquia', 'Bogotá', 'Cali', 'Barranquilla'];

DUMMY_LOCATIONS.forEach((location) => {
	const option = document.createElement('option');
	const content = document.createTextNode(location);
	option.appendChild(content);
	option.value = location;
	dataListLocations.appendChild(option);
});

const disabledCaractersNumberInput = ['e', 'E', '-', '.'];

idNumberInput.addEventListener(
	'keypress',
	(evt) =>
		disabledCaractersNumberInput.concat('+').includes(evt.key) &&
		evt.preventDefault()
);

celInput.addEventListener(
	'keypress',
	(evt) =>
		disabledCaractersNumberInput.includes(evt.key) && evt.preventDefault()
);

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
			element: idNumberInput,
			validators: [validatorWrapper(isNumeric), validatorWrapper(isID)],
		},
		{
			valid: false,
			element: nameInput,
			validators: [
				validatorWrapper(isNameAndLastName),
				validatorWrapper(isLength, { min: 5, max: 50 }),
			],
		},
		{
			valid: false,
			element: celInput,
			validators: [validatorWrapper(isMobilePhone)],
		},
		{
			valid: false,
			element: emailInput,
			validators: [validatorWrapper(isEmail)],
		},
		{
			valid: false,
			element: areaInput,
			validators: [
				validatorWrapper(isName),
				validatorWrapper(isLength, { min: 3 }),
			],
		},
		{
			valid: false,
			element: cargoInput,
			validators: [
				validatorWrapper(isName),
				validatorWrapper(isLength, { min: 3 }),
			],
		},
		{
			valid: false,
			element: locationInput,
			validators: [validatorWrapper(isIn, DUMMY_LOCATIONS)],
		},
		{
			valid: false,
			element: timeSinceInput,
			validators: [validatorWrapper(isTime)],
		},
		{
			valid: false,
			element: timeUntilInput,
			validators: [validatorWrapper(isTime)],
		},
	],
};

function checkInput(evt, input) {
	removeErrorsOfInput(input.element);
	const errors = validateInput(evt, input);
	if (errors.length > 0) {
		input.valid = false;
		input.element.className = 'input--invalid';
		addErrorsToInput(input.element, errors);
	} else {
		input.valid = true;
		input.element.className = 'input--valid';
	}
}

function validateInput(evt, input) {
	return input.validators
		.map((validator) => validator(evt.target.value))
		.filter((el) => el.length > 0);
}

function addErrorsToInput(element, errors) {
	const parent = element.parentNode;
	errors.forEach((err) => {
		const span = document.createElement('span');
		const content = document.createTextNode(err);
		span.appendChild(content);
		span.className = 'input__message--invalid';
		parent.insertBefore(span, element.nextSibling);
	});
}

function removeErrorsOfInput(element) {
	const parent = element.parentNode;
	let sibling = element.nextSibling;
	while (sibling) {
		const aux = sibling.nextSibling;
		if (sibling.className === 'input__message--invalid')
			parent.removeChild(sibling);
		sibling = aux;
	}
}

formObject.inputs.forEach((input) => {
	input.element.addEventListener('input', (evt) => {
		checkInput(evt, input);
	});
});

form.addEventListener('submit', (event) => {
	event.preventDefault();
	if (!formObject.valid()) {
		createSimpleModal('Debes completar todos los campos correctamente');
	} else {
		const content = {};

		for (const input of formObject.inputs) {
			const label = document.querySelector(`label[for=${input.element.id}]`);
			content[label.innerText] = input.element.value;
		}

		content[
			'Horario de contacto'
		] = `${content['Desde:']} - ${content['Hasta:']}`;
		delete content['Desde:'];
		delete content['Hasta:'];

		content['Ubicación'] =
			content[
				'Si necesitamos contactarte telefónicamente, indicanos donde te encuentras?'
			];
		delete content[
			'Si necesitamos contactarte telefónicamente, indicanos donde te encuentras?'
		];

		createConfirmDataModal(content, clearForm);
	}
});

function clearForm() {
	formObject.inputs.forEach((input) => {
		input.valid = false;
		input.element.value = '';
		input.element.className = '';
		removeErrorsOfInput(input.element);
	});
}
