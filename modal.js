let modal;
let backdrop;

export function showModalError(message) {
	if (modal) {
		return;
	}

	modal = document.createElement('div');
	modal.className = 'modal';

	const modalText = document.createElement('p');
	modalText.textContent = message;

	const modalCancelAction = document.createElement('button');
	modalCancelAction.textContent = 'Cerrar';
	modalCancelAction.className = 'btn';
	modalCancelAction.addEventListener('click', closeModal);

	const card = document.createElement('div');
	card.className = 'card';

	card.append(modalText);
	card.append(modalCancelAction);

	modal.append(card);

	document.body.append(modal);

	backdrop = document.createElement('div');
	backdrop.className = 'backdrop';

	document.body.append(backdrop);
}

function closeModal() {
	modal.remove();
	modal = null;

	backdrop.remove();
	backdrop = null;
}
