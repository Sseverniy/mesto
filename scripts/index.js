import {Card} from './card.js';
import {FormValidator, validationConfig} from './validate.js';
import {initialCards} from './data.js';

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

initialCards.forEach((item) => {
  const card = new Card(item, '.template');
  const cardElement = card.generateCard();

  cardsContainer.append(cardElement);
})

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
  const validation = new FormValidator(validationConfig, profileEditorForm);
  validation.enableValidation();
  openPopup(popupProfile);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleKey);
  popup.addEventListener('click', closeByOverlayClick);
  
  
  const validation = new FormValidator(validationConfig, newPlaceForm);
  validation.enableValidation();
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

pictureEditButton.addEventListener('click', function() {
  openPopup(popupNewPlace)});
newPlaceCloseButton.addEventListener('click', function() {
  closePopup(popupNewPlace)});
newPlaceForm.addEventListener('submit', handlePicFormSubmit);
export {imgCloseButton};