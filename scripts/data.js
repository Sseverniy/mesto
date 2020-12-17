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
