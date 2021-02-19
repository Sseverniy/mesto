import { Popup } from './Popup.js';

export class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._submitButton = document.querySelector('.popup__save-button_delete');
  }

  setEventListeners(deleteCard){
    super.setEventListeners();
    this._handleButtonConfirmation = deleteCard;
    this._submitButton.addEventListener('click', this._handleButtonConfirmation);
  }

  close() {
    super.close();
    this._submitButton.removeEventListener('click', this._handleButtonConfirmation);
  }
};
