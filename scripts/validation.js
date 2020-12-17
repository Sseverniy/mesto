const formEditProfile = popupProfile.querySelector('.popup__form');
const inputListEditForm = popupProfile.querySelectorAll('.popup__input');
const submitButton = popupProfile.querySelector('.popup__save-button');

function showError(form, input) {
  const error = formEditProfile.querySelector(`#${input.id}-error`);
  error.textContent = input.validationMessage;
  input.classList.add('popup__input_invalid');//не забыть добавить создать класс в css
}

function hideError(form, input) {
  const error = formEditProfile.querySelector(`#${input.id}-error`);
  error.textContent = "";
  input.classList.remove('popup__input_invalid');
}

function checkInputValidity(form, input) {
  if (input.validity.valid) {
    hideError(form, input);
  }
  else {
    showError(form, input);
  }
}

function buttonState (button, isActive) {
  if (isActive) {
    button.classList.remove('popup__save-button_invalid');
    button.disabled = false;
  }
  else {
    button.classList.add('popup__save-button_invalid');
    button.disabled = true;
  }
}

inputListEditForm.forEach(input => {
  input.addEventListener('input', (evt) => {
    checkInputValidity(formEditProfile, input);
    buttonState(submitButton, formEditProfile.checkValidity());
  })
})
