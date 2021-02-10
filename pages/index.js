import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {initialCards} from '../components/data.js';
import {Section} from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo} from '../components/UserInfo.js';

const popupProfile = document.querySelector('.popup_edit-profile');
const profileEditButton = document.querySelector('.profile__edit-button');
const inputName = popupProfile.querySelector('.popup__input_profile_name');
const inputInfo = popupProfile.querySelector('.popup__input_profile_info');
const profileEditorForm = popupProfile.querySelector('.popup__form');
const pictureEditButton = document.querySelector('.profile__button');
const popupNewPlace = document.querySelector('.popup_add-place');
const cardsContainer = document.querySelector('.cards');
const newPlaceForm = popupNewPlace.querySelector('.popup__form');
const popupImgTitle = document.querySelector('.popup__image-heading');
const popupImgBlock = document.querySelector('.popup_image');
const newPlaceInputName = document.querySelector('.popup__input_picture_name');
const newPlaceInputLink = document.querySelector('.popup__input_picture_link');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_invalid',
  inputErrorClass: 'popup__input_invalid',
}; 

const сardList = new Section({ items: initialCards,  renderer:(item)=> {
  const card = new Card(item, '.template', () => {popupImg.open(item.name, item.link);});
  const cardElement = card.generateCard();
  сardList.addItem(cardElement);
}} , '.cards');

сardList.renderItems();

// initialCards.forEach((item) => {
//   const card = new Card(item, '.template');
//   const cardElement = card.generateCard();

//   cardsContainer.append(cardElement);
// })
const userProfile = new UserInfo({userNameSelector:'.profile__name', userInfoSelector:'.profile__info'});


export const popupImg = new PopupWithImage('.popup_image');
popupImg.setEventListeners();

const popupProfileEditor = new PopupWithForm('.popup_edit-profile', () => {
  userProfile.setUserInfo(inputName.value, inputInfo.value);
});
popupProfileEditor.setEventListeners();

const popupNewPlaceAdder = new PopupWithForm('.popup_add-place', (data) => {
  const cardClass = new Card({name:newPlaceInputName.value, link:newPlaceInputLink.value},'.template');
  const newOneCard = cardClass.generateCard();
  cardsContainer.prepend(newOneCard);
})
popupNewPlaceAdder.setEventListeners();

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

function checkButtonState(popup, validation, form) {
  const submitButton = popup.querySelector(validationConfig.submitButtonSelector);
  validation.buttonState(submitButton, form.checkValidity());
}


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

profileEditButton.addEventListener('click', ()=>{
  [inputName.value, inputInfo.value] = userProfile.getUserInfo();
  checkButtonState(popupProfile, profileValidation, profileEditorForm);
  popupProfileEditor.open();
});
pictureEditButton.addEventListener('click', ()=>{
  checkButtonState(popupNewPlace, placeValidation, newPlaceForm);
  popupNewPlaceAdder.open();
});

const placeValidation = new FormValidator(validationConfig, newPlaceForm);
placeValidation.enableValidation();

const profileValidation = new FormValidator(validationConfig, profileEditorForm);
profileValidation.enableValidation();
