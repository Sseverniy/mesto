import {handlePreviewPicture, popupImg } from '../pages/index.js';

export class Card {
  constructor (data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  //создаем шаблон карточки
  _getTemplate() {
    const newCard = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
    return newCard;
  }

  //наполняем карточку содержимым
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    const pictureElement = this._element.querySelector('.card__pic');
    
    this._element.querySelector('.card__place-name').textContent = this._name;
    pictureElement.alt = this._name;
    pictureElement.src = this._link;
    return this._element;
  }
  
  //прописываем все слушатели событий
  _setEventListeners() {
    this._element.querySelector('.card__delete').addEventListener('click', ()=> {
      this._handleDeleteCard();
    });
    this._element.querySelector('.card__like').addEventListener('click', ()=> {
      this._handleLikeIcon();
    });
    this._element.querySelector('.card__pic').addEventListener('click', ()=> {
      // handlePreviewPicture(this._name, this._link);
      
      this._handleCardClick();
    });
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  _handleLikeIcon() {
    this._element.querySelector('.card__like').classList.toggle('card__like_active');
  }
};
