let modal;
let backdrop;

export function createConfirmDataModal(content, onAccept) {
	createModal();

	const title = document.createElement('h2');
	title.textContent = 'Confirme los datos';
	title.className = 'modal__title';

	const dataElements = createFormDataElements(content);

	const modalCancelAction = createCancelButton();
	modalCancelAction.addEventListener('click', closeModal);

	const modalAcceptAction = document.createElement('button');
	modalAcceptAction.textContent = 'Aceptar';
	modalAcceptAction.className = 'btn btn--accept';
	modalAcceptAction.addEventListener('click', () => {
		closeModal();
		onAccept();
		createSimpleModal('El formulario se ha enviado ✔︎');
	});

	const card = createCard();

	card.append(title);
	dataElements.forEach((el) => card.append(el));
	card.append(modalCancelAction);
	card.append(modalAcceptAction);

	modal.append(card);
	createBackdrop();
	showModal();
}

export function createSimpleModal(content) {
	createModal();

	const modalText = document.createElement('p');
	modalText.textContent = content;

	const modalCancelAction = createCancelButton();
	modalCancelAction.addEventListener('click', closeModal);

	const card = createCard();

	card.append(modalText);
	card.append(modalCancelAction);

	modal.append(card);

	createBackdrop();
	showModal();
}

function createModal() {
	modal = document.createElement('div');
	modal.className = 'modal';
}

function createCancelButton() {
	const cancelButton = document.createElement('button');
	cancelButton.textContent = 'Cerrar';
	cancelButton.className = 'btn btn--close';
	return cancelButton;
}

function createCard() {
	const card = document.createElement('div');
	card.className = 'card';
	return card;
}

function createFormDataElements(content) {
	return Object.entries(content).map((input) => {
		const inputName = document.createElement('div');
		inputName.textContent = input[0];
		inputName.className = 'modal__input--label';

		const inputValue = document.createElement('div');
		inputValue.textContent = input[1];
		inputValue.className = 'modal__input--value';

		const wrapper = document.createElement('div');
		wrapper.className = 'modal__input';
		wrapper.append(inputName);
		wrapper.append(inputValue);

		return wrapper;
	});
}

function createBackdrop() {
	backdrop = document.createElement('div');
	backdrop.className = 'backdrop';
	backdrop.addEventListener('click', closeModal);
}

function showModal() {
	document.body.append(modal);
	document.body.append(backdrop);
}

function closeModal() {
	modal.remove();
	modal = null;

	backdrop.remove();
	backdrop = null;
}
