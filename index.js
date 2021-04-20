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

const formObject = {
	valid: function () {
		const invalidInputs = this.inputs.filter((input) => !input.valid);
		return invalidInputs.length === 0;
	},
	element: form,
	inputs: [
		{
			valid: false,
			touched: false,
			element: idNumberInput,
		},
		{
			valid: false,
			touched: false,
			element: nameInput,
		},
		{
			valid: false,
			touched: false,
			element: celInput,
		},
		{
			valid: false,
			touched: false,
			element: emailInput,
		},
		{
			valid: false,
			touched: false,
			element: areaInput,
		},
		{
			valid: false,
			touched: false,
			element: cargoInput,
		},
		{
			valid: false,
			touched: false,
			element: locationInput,
		},
		{
			valid: false,
			touched: false,
			element: timeSinceInput,
		},
		{
			valid: false,
			touched: false,
			element: timeUntilInput,
		},
	],
};

form.addEventListener('submit', (event) => {
	event.preventDefault();
	console.log('formSubmited');
});
