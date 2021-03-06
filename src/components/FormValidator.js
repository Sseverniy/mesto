class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
  };

  _showError(input) {
    const error = this._form.querySelector(`#${input.id}-error`);
    error.textContent = input.validationMessage;
    input.classList.add(this._config.inputErrorClass);
  };

  hideError(input) {
    const error = this._form.querySelector(`#${input.id}-error`);
    error.textContent = "";
    input.classList.remove(this._config.inputErrorClass);
  };

  _checkInputValidity(input) {
    if (input.validity.valid) {
      this.hideError(input);
    } else {
      this._showError(input);
    }
  };

  buttonState(button, isActive) {
    if (isActive) {
      button.classList.remove(this._config.inactiveButtonClass);
      button.disabled = false;
    } else {
      button.classList.add(this._config.inactiveButtonClass);
      button.disabled = true;
    }
  };

  _setEventListeners() {
    const inputListEditForm = this._form.querySelectorAll(
      this._config.inputSelector
    );
    const submitButton = this._form.querySelector(
      this._config.submitButtonSelector
    );

    inputListEditForm.forEach((input) => {
      input.addEventListener("input", (evt) => {
        this._checkInputValidity(input);
        this.buttonState(submitButton, this._form.checkValidity());
      });
    });
  };

  enableValidation() {
    this._setEventListeners();
  };
};

export {FormValidator};
