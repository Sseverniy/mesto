import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
// import {initialCards} from '../components/data.js';
import {Section} from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo} from '../components/UserInfo.js';
import {Api} from '../components/Api.js';
import '../pages/index.css';

const popupProfile = document.querySelector('.popup_edit-profile');
const profileEditButton = document.querySelector('.profile__edit-button');
const inputName = popupProfile.querySelector('.popup__input_profile_name');
const inputInfo = popupProfile.querySelector('.popup__input_profile_info');
const profileEditorForm = popupProfile.querySelector('.popup__form');
const pictureEditButton = document.querySelector('.profile__button');
const popupNewPlace = document.querySelector('.popup_add-place');
const cardsContainer = document.querySelector('.cards');
const newPlaceForm = popupNewPlace.querySelector('.popup__form');
const newPlaceInputName = document.querySelector('.popup__input_picture_name');
const newPlaceInputLink = document.querySelector('.popup__input_picture_link');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_invalid',
  inputErrorClass: 'popup__input_invalid',
};

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-20',
  headers: {
    'content-type': 'application/json',
    authorization: '717001aa-07a2-43d7-857a-292939e342e8'
  }
});

//загружаем карточки с сервера
const cards = api.getInitialCards();
cards.then((data) => {
  const initialCards = data;
  const сardList = new Section({ items: initialCards,  renderer:(item)=> {
    const cardElement = createCard(item);
    сardList.addItem(cardElement);
  }} , '.cards');
  сardList.renderItems();
})


function createCard(data) {
  const card = new Card(data,'.template', () => {popupImg.open(data.name,data.link);});
  return card.generateCard();
}

function checkButtonState(popup, validation, form) {
  const submitButton = popup.querySelector(validationConfig.submitButtonSelector);
  validation.buttonState(submitButton, form.checkValidity());
}

// const сardList = new Section({ items: initialCards,  renderer:(item)=> {
//   const cardElement = createCard(item);
//   сardList.addItem(cardElement);
// }} , '.cards');

// сardList.renderItems();

const userProfile = new UserInfo({userNameSelector:'.profile__name', userInfoSelector:'.profile__info'});

export const popupImg = new PopupWithImage('.popup_image');

const popupProfileEditor = new PopupWithForm('.popup_edit-profile', (data) => {
  userProfile.setUserInfo(data['profile-name'], data['profile-info']);
});

const popupNewPlaceAdder = new PopupWithForm('.popup_add-place', (data) => {
  const newOneCard = createCard(data);
  cardsContainer.prepend(newOneCard);
})

// const handlePreviewPicture = (cardName, item) => {
//   popupImgTitle.textContent = cardName;
//   const popupFullSizeImg = document.getElementById('popup-picture');
//   popupFullSizeImg.src = item;
//   popupFullSizeImg.alt = cardName;
  
//   openPopup(popupImgBlock);
// };

// function openProfileEditor() {
//   inputName.value = profileName.textContent;
//   inputInfo.value = profileInfo.textContent;
  
//   checkButtonState(popupProfile, profileValidation, profileEditorForm);
//   openPopup(popupProfile);
// }

// function openNewPlacePopup() {
//   checkButtonState(popupNewPlace, placeValidation, newPlaceForm);
//   newPlaceForm.reset();
//   openPopup(popupNewPlace);
// }

// function handleProfileEditorSubmit(event) {
//   event.preventDefault();

//   profileName.textContent = inputName.value;
//   profileInfo.textContent = inputInfo.value;
  
//   closePopup(popupProfile);
// }

// function handlePicFormSubmit(event) {
//   event.preventDefault();
  
//   const cardClass = new Card({name:newPlaceInputName.value, link:newPlaceInputLink.value},'.template');
//   const newOneCard = cardClass.generateCard();
//   cardsContainer.prepend(newOneCard);
  
//   newPlaceForm.reset();
//   closePopup(popupNewPlace);
// }

popupImg.setEventListeners();
popupProfileEditor.setEventListeners();
popupNewPlaceAdder.setEventListeners();

profileEditButton.addEventListener('click', ()=>{
  [inputName.value, inputInfo.value] = userProfile.getUserInfo();
  checkButtonState(popupProfile, profileValidation, profileEditorForm);
  profileValidation.hideError(inputName);
  profileValidation.hideError(inputInfo);
  popupProfileEditor.open();
});

pictureEditButton.addEventListener('click', ()=>{
  checkButtonState(popupNewPlace, placeValidation, newPlaceForm);
  placeValidation.hideError(newPlaceInputName);
  placeValidation.hideError(newPlaceInputLink);
  popupNewPlaceAdder.open();
});

const placeValidation = new FormValidator(validationConfig, newPlaceForm);
placeValidation.enableValidation();

const profileValidation = new FormValidator(validationConfig, profileEditorForm);
profileValidation.enableValidation();
