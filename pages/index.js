import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {initialCards} from '../components/data.js';
import {Section} from '../components/Section.js';

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
const popupImgTitle = document.querySelector('.popup__image-heading');
const popupImgBlock = document.querySelector('.popup_image');
const imgCloseButton = popupImgBlock.querySelector('.popup__close-button');
const newPlaceInputName = document.querySelector('.popup__input_picture_name');
const newPlaceInputLink = document.querySelector('.popup__input_picture_link');
const popupImg = document.querySelector('.popup__picture');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_invalid',
  inputErrorClass: 'popup__input_invalid',
}; 

const сardList = new Section({ items: initialCards,  renderer:(item)=> {
  const card = new Card(item, '.template');
  const cardElement = card.generateCard();
  сardList.addItem(cardElement);
}} , '.cards');

сardList.renderItems();

// initialCards.forEach((item) => {
//   const card = new Card(item, '.template');
//   const cardElement = card.generateCard();

//   cardsContainer.append(cardElement);
// })

const handlePreviewPicture = (cardName, item) => {
  popupImgTitle.textContent = cardName;
  const popupFullSizeImg = document.getElementById('popup-picture');
  popupFullSizeImg.src = item;
  popupFullSizeImg.alt = cardName;
  
  openPopup(popupImgBlock);
};

function openProfileEditor() {
  inputName.value = profileName.textContent;
  inputInfo.value = profileInfo.textContent;
  
  checkButtonState(popupProfile, profileValidation, profileEditorForm);
  openPopup(popupProfile);
}

function openNewPlacePopup() {
  checkButtonState(popupNewPlace, placeValidation, newPlaceForm);
  newPlaceForm.reset();
  openPopup(popupNewPlace);
}

function checkButtonState(popup, validation, form) {
  const submitButton = popup.querySelector(validationConfig.submitButtonSelector);
  validation.buttonState(submitButton, form.checkValidity());
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleKey);
  popup.addEventListener('click', closeByOverlayClick);
  
}

function closeByOverlayClick(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleKey);
  popup.removeEventListener('click', closeByOverlayClick);
}

function handleProfileEditorSubmit(event) {
  event.preventDefault();

  profileName.textContent = inputName.value;
  profileInfo.textContent = inputInfo.value;
  
  closePopup(popupProfile);
}

function handlePicFormSubmit(event) {
  event.preventDefault();
  
  const cardClass = new Card({name:newPlaceInputName.value, link:newPlaceInputLink.value},'.template');
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

profileEditButton.addEventListener('click', openProfileEditor);
profileCloseButton.addEventListener('click', function() {
  closePopup(popupProfile)});
profileEditorForm.addEventListener('submit', handleProfileEditorSubmit); 

pictureEditButton.addEventListener('click', openNewPlacePopup);
newPlaceCloseButton.addEventListener('click', function() {
  closePopup(popupNewPlace)});
newPlaceForm.addEventListener('submit', handlePicFormSubmit);
imgCloseButton.addEventListener('click', () => {
  closePopup(popupImgBlock);
});

const placeValidation = new FormValidator(validationConfig, newPlaceForm);
placeValidation.enableValidation();

const profileValidation = new FormValidator(validationConfig, profileEditorForm);
profileValidation.enableValidation();

export {handlePreviewPicture};