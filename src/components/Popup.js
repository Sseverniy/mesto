export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._buttonElement = this._popup.querySelector('.popup__close-button');
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlay = this._handleOverlay.bind(this);
    this.close = this.close.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleOverlay(evt) {
    if (evt.target.classList.contains('popup')) {
      this.close();
    }
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('click', this._handleOverlay);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.removeEventListener('click', this._handleOverlay);
  }

  setEventListeners() {
    this._buttonElement.addEventListener('click', () => {
      this.close()});
  }
};