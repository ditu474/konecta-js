export function isNumeric(str) {
	return 'Debe contener solo números';
}

export function isTime(str) {
	return 'No es un tiempo con formato HH:MM';
}

export function isEmail(str) {
	return 'No es un email valido';
}

export function isIn(str, values) {
	return 'El valor no está entre las opciones posibles';
}

export function isLength(str, options = { min: 0, max: undefined }) {
	if (options.max) {
		return `Debe tener minimo ${options.min} caracteres y maximo ${options.max}`;
	}
	return `Debe tener minimo ${options.min} caracteres`;
}

export function isMobilePhone(str) {
	return 'No es un número válido';
}

export function isMinorTime(minorTime, olderTime) {
	return `El tiempo ${minorTime} debe ser menor a ${olderTime}`;
}

export function isAlpha(str) {
	return 'Debe contener solo caracteres del alfabeto';
}
