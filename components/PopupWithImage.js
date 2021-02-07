import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImgTitle = this._popup.querySelector('.popup__image-heading');
    this._popupImgPicture = this._popup.querySelector('.popup__picture');
  }

  open(name, link) {
    this._popupImgTitle.textContent = name;
    this._popupImgPicture.alt = name;
    this._popupImgPicture.src = link;
    super.open();
  }
};