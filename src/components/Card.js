// import {myId} from '../pages/index.js';

export class Card {
  constructor ({data, myId}, cardSelector, {handleCardClick, handleLikeClick, handleDeleteIconClick}) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._owner = data.owner._id;
    this._myId = myId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
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

  updateLikeCounter() {
    const likeCounter = this._element.querySelector('.card__like-counter');
    likeCounter.textContent = this._likes.length;
  }

  handleLikeIcon() {
    this._element.querySelector('.card__like').classList.toggle('card__like_active');
  }

  updateLikesLength(data) {
    this._likes = data;
    this.updateLikeCounter();
    this.handleLikeIcon();
  }

  _checkCardOwner(){
    if(!(this._owner === this._myId)){
      this._deleteButton.style.display = 'none';
    }
  }

  //наполняем карточку содержимым
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    const pictureElement = this._element.querySelector('.card__pic');
    this._deleteButton = this._element.querySelector('.card__delete');
    this._likeButton = this._element.querySelector('.card__like');
    
    
    this._element.querySelector('.card__place-name').textContent = this._name;
    pictureElement.alt = this._name;
    pictureElement.src = this._link;
    this.updateLikeCounter();
    this._checkCardOwner();

    this._likes.forEach(like => {
      if (like._id === this._myId) {
        this._likeButton.classList.add('card__like_active');
      }
    })

    return this._element;
  }

  //прописываем все слушатели событий
  _setEventListeners() {
    this._element.querySelector('.card__delete').addEventListener('click', ()=> {
      this._handleDeleteIconClick();
    });
    this._element.querySelector('.card__like').addEventListener('click', ()=> {
      this._handleLikeClick(this._likeButton);
    });
    this._element.querySelector('.card__pic').addEventListener('click', ()=> {
      this._handleCardClick();
    });
  }

  handleDeleteCard() {
    this._element.remove();
  }
};
