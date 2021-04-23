export function isNumeric(str) {
	const regexp = new RegExp(/^[0-9]+$/);
	if (!regexp.test(str)) return 'Debe contener solo números';
	return '';
}

export function isTime(str) {
	const message = 'No es un tiempo con formato HH:MM';
	if (str.includes(':') === -1) {
		return message;
	} else if (str.length !== 5) {
		return message;
	} else {
		const parts = str.split(':');
		const hours = parseInt(parts[0]);
		const minutes = parseInt(parts[1]);
		if (hours < 0 || hours > 24) {
			return 'La hora solo puede estar entre 00 y 24';
		} else if (minutes < 0 || minutes > 59) {
			return 'Los minutos solo pueden estar entre 00 y 59';
		}
	}
	return '';
}

export function isEmail(str) {
	const regexp = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
	if (!regexp.test(str)) return 'No es un email válido';
	return '';
}

export function isIn(str, values) {
	if (!values.includes(str)) {
		return 'El valor no está entre las opciones disponibles';
	}
	return '';
}

export function isLength(str, options = { min: 0, max: undefined }) {
	const len = str.length;
	if (
		len >= options.min &&
		(typeof options.max === 'undefined' || len <= options.max)
	) {
		return '';
	} else {
		const message = `Debe tener mínimo ${options.min} caracteres`;
		if (typeof options.max === 'undefined') {
			return message;
		}
		return message + ` y máximo ${options.max}`;
	}
}

export function isMobilePhone(str) {
	const regexp = new RegExp(/^(\+?57)?3(0(0|1|2|4|5)|1\d|2[0-4]|5(0|1))\d{7}$/);
	if (!regexp.test(str)) return 'No es un número celular válido';
	return '';
}

export function isNameAndLastName(str) {
	const regexp = new RegExp(
		/^[a-zA-ZÀ-ú]{3,}(([',. -][a-zA-ZÀ-ú]{2,})[a-zA-ZÀ-ú]*)+$/
	);
	if (!regexp.test(str)) return 'Debes ingresar un nombre y un apellido válido';
	return '';
}

export function isName(str) {
	const regexp = new RegExp(
		/^[a-zA-ZÀ-ú]+(([',. -][a-zA-ZÀ-ú])[a-zA-ZÀ-ú]*)*$/
	);
	if (!regexp.test(str))
		return 'Debe contener solo letras y espacios entre ellas';
	return '';
}
