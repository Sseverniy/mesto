const popupProfile = document.querySelector('.popup_edit-profile');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileCloseButton = popupProfile.querySelector('.popup__close-button');
const profileName = document.querySelector('.profile__name');
const inputName = popupProfile.querySelector('.popup__input_profile_name');
const profileInfo = document.querySelector('.profile__info');
const inputInfo = popupProfile.querySelector('.popup__input_profile_info');
const profileEditorForm = popupProfile.querySelector('.popup__form');

const pictureEditButton = document.querySelector('.profile__button');
const popupNewPlace = document.querySelector('.popup_add-place');
const newPlaceCloseButton = popupNewPlace.querySelector('.popup__close-button');
const cardsContainer = document.querySelector('.cards');
const newPlaceForm = popupNewPlace.querySelector('.popup__form');
const template = document.querySelector('.template');
const popupImgTitle = document.querySelector('.popup__image-heading');
const popupImgBlock = document.querySelector('.popup_image');
const imgCloseButton = popupImgBlock.querySelector('.popup__close-button');
const newPlaceInputName = document.querySelector('.popup__input_picture_name');
const newPlaceInputLink = document.querySelector('.popup__input_picture_link');

const popupImg = document.querySelector('.popup__picture');

class Card {
  constructor (data) {
    this._name = data.name;
    this._link = data.link;
  }

  //создаем шаблон карточки
  _getTemplate() {
    const newCard = document
      .querySelector('.template')
      .content
      .querySelector('.card')
      .cloneNode(true);
    return newCard;
  }

  //наполняем карточку содержимым
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    
    this._element.querySelector('.card__place-name').textContent = this._name;
    this._element.querySelector('.card__pic').alt = this._name;
    this._element.querySelector('.card__pic').src = this._link;
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
      this._handlePreviewPicture();
    });
    imgCloseButton.addEventListener('click', () => {
      closePopup(popupImgBlock);
    });
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  _handleLikeIcon() {
    this._element.querySelector('.card__like').classList.toggle('card__like_active');
  }

  _handlePreviewPicture() {
    popupImgTitle.textContent = this._name;
    popupImg.alt = this._name;
    popupImg.src = this._link;
    openPopup(popupImgBlock);
  }
};

initialCards.forEach((item) => {
  const card = new Card(item);
  const cardElement = card.generateCard();

  cardsContainer.append(cardElement);
})

// function addInitialCards() {
//   const cards = initialCards.map(getCardElement);
//   cardsContainer.append(...cards);
// }

// const getCardElement = (item) => {
//   const newCard = template.content.cloneNode(true);
//   const cardName = newCard.querySelector('.card__place-name');
//   cardName.textContent = item.name;
//   const cardImgById = newCard.getElementById('card-image');
//   cardImgById.src = item.link;
//   cardImgById.alt = item.name;

//   const cardImg = newCard.querySelector('.card__pic');
//   const deleteButton = newCard.querySelector('.card__delete');
//   const likeButton = newCard.querySelector('.card__like');

//   deleteButton.addEventListener('click', handleDeleteCard);
//   likeButton.addEventListener('click', handleLikeIcon);
//   cardImg.addEventListener('click', () => handlePreviewPicture(cardName, item)); 
  
//   return newCard;
// };

// const handleDeleteCard = (evt) => {
//   evt.target.closest('.card').remove();
// };

// const handleLikeIcon = (evt) => {
//   evt.target.classList.toggle('card__like_active');
// };

const handlePreviewPicture = (cardName, item) => {
  popupImgTitle.textContent = cardName.textContent;
  const popupFullSizeImg = document.getElementById('popup-picture');
  popupFullSizeImg.src = item.link;
  popupFullSizeImg.alt = item.name;
  
  openPopup(popupImgBlock);
};

function openProfileEditor() {
  inputName.value = profileName.textContent;
  inputInfo.value = profileInfo.textContent;
  openPopup(popupProfile);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleKey);
  popup.addEventListener('click', closeByOverlayClick);
  
  enableValidation(validationConfig);
}

function closeByOverlayClick(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleKey);
}

function handleProfileEditorSubmit(event) {
  event.preventDefault();

  profileName.textContent = inputName.value;
  profileInfo.textContent = inputInfo.value;

  closePopup(popupProfile);
}

function handlePicFormSubmit(event) {
  event.preventDefault();
  
  const cardClass = new Card({name:newPlaceInputName.value, link:newPlaceInputLink.value});
  const newOneCard = cardClass.generateCard();
  cardsContainer.prepend(newOneCard);
  
  newPlaceForm.reset();
  closePopup(popupNewPlace);
}

function handleKey(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup)
  }
}

// addInitialCards();

profileEditButton.addEventListener('click', openProfileEditor);
profileCloseButton.addEventListener('click', function() {
  closePopup(popupProfile)});
profileEditorForm.addEventListener('submit', handleProfileEditorSubmit); 

pictureEditButton.addEventListener('click', function() {
  openPopup(popupNewPlace)});
newPlaceCloseButton.addEventListener('click', function() {
  closePopup(popupNewPlace)});
// imgCloseButton.addEventListener('click', function() {
//   closePopup(popupImgBlock)});
newPlaceForm.addEventListener('submit', handlePicFormSubmit);
