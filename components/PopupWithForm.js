import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._form = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._inputValues = {};

    this._inputList.forEach(input => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  setEventListeners() {
    this._popup.addEventListener('submit', (evt)=>{
      evt.preventDefault();
      this._submitForm(this._getInputValues());
      this.close();
    });
  }

  close() {
    this._form.reset();
    super.close();
  }
};