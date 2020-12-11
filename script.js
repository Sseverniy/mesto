const popupProfile = document.querySelector('.popup_edit-profile');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileCloseButton = document.querySelector('.popup__close-button_edit-profile');
let profileName = document.querySelector('.profile__name');
let inputName = document.querySelector('.popup__input_profile_name');
let profileInfo = document.querySelector('.profile__info');
let inputInfo = document.querySelector('.popup__input_profile_info');
const formElement = document.querySelector('.popup__form_edit-profile');

const pictureEditButton = document.querySelector('.profile__button');
const popupNewPlace = document.querySelector('.popup_add-place');
const newPlaceCloseButton = document.querySelector('.popup__close-button_add-place');
let cardsContainer = document.querySelector('.cards');
const newPlaceFormElement = document.querySelector('.popup__form_add-place');
const template = document.querySelector('.template');
let popupImgTitle = document.querySelector('.popup__image-heading');
let popupImgBlock = document.querySelector('.popup_image');
const imgCloseButton = document.querySelector('.popup__close-button_image');
const newPlaceInputName =document.querySelector('.popup__input_picture_name');
const newPlaceInputLink =document.querySelector('.popup__input_picture_link');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function addInitialCards() {
  //создаем массив карточек с подставленными значениями
  let cards = initialCards.map(makeCards);
  cardsContainer.append(...cards);
}

function makeCards(item) {
  const newCard = template.content.cloneNode(true);
  const cardName = newCard.querySelector('.card__place-name');
  cardName.textContent = item.name;
  newCard.getElementById('card-image').src = item.link;
  newCard.getElementById('card-image').alt = item.name;
 

  newCard.querySelector('.card__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like_active');
  });
  
  const deleteButton = newCard.querySelector('.card__delete');
  deleteButton.addEventListener('click', function (evt) {
    evt.target.closest('.card').remove();
  });
  
  const cardImg = newCard.querySelector('.card__pic');
  cardImg.addEventListener('click', function (evt) {
    popupImgTitle.textContent = cardName.textContent;
    //add src and alt
    document.getElementById('popup-picture').src = item.link;
    
    popupImgBlock.classList.add('popup_opened');

  });
  return newCard;
}

function openPopup() {
  inputName.value = profileName.textContent;
  inputInfo.value = profileInfo.textContent;
  popupProfile.classList.add('popup_opened');
}

function openPicPopup() {
  popupNewPlace.classList.add('popup_opened');
}

function closePopup() {
  popupProfile.classList.remove('popup_opened');
  popupNewPlace.classList.remove('popup_opened');
  popupImgBlock.classList.remove('popup_opened');
}

function formSubmitHandler (event) {
    event.preventDefault();

    profileName.textContent = inputName.value;
    profileInfo.textContent = inputInfo.value;
    
    closePopup();
}

function picFormSubmitHandler (event) {
  event.preventDefault();

  const newOneCard = makeCards({name:newPlaceInputName.value, link:newPlaceInputLink.value});
  cardsContainer.prepend(newOneCard);
  
  closePopup();
}

addInitialCards();

profileEditButton.addEventListener('click', openPopup);
profileCloseButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler); 

pictureEditButton.addEventListener('click', openPicPopup);
newPlaceCloseButton.addEventListener('click', closePopup);
imgCloseButton.addEventListener('click', closePopup);
newPlaceFormElement.addEventListener('submit', picFormSubmitHandler);
