import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithSubmit } from '../components/PopupWithSubmit.js';
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
const newPlaceSubmitButton = popupNewPlace.querySelector('.popup__save-button');
const popupAvatar= document.querySelector('.popup_avatar');
const avatarEditorForm = popupAvatar.querySelector('.popup__form');
const newPlaceInputName = document.querySelector('.popup__input_picture_name');
const newPlaceInputLink = document.querySelector('.popup__input_picture_link');
const avatarElement = document.querySelector('.profile__avatar');
const profileSubmitButton = popupProfile.querySelector('.popup__save-button');
const avatarSubmitButton = popupAvatar.querySelector('.popup__save-button');
const avatarInput = popupAvatar.querySelector('.popup__input');
export const myId = '75daeea6e179d67340003a93';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_invalid',
  inputErrorClass: 'popup__input_invalid',
};

function removeCard(id, card) {
  return() => {
    api.deleteCard(id)
    .then(() => {
      deleteConfirmation.close()
      card.handleDeleteCard();
    })
    .catch((err) => {console.log(err)});
  }
}

function renderLoading(isLoading, button, initialText) {
  if(isLoading){
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = initialText;
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-20',
  headers: {
    'content-type': 'application/json',
    authorization: '717001aa-07a2-43d7-857a-292939e342e8'
  }
});

const deleteConfirmation = new PopupWithSubmit('.popup_delete');

//лайк добавляется, но не убирается
const createCard = (data) => {
  const card = new Card(data,'.template', {
    handleCardClick: () => {
      popupImg.open(data.name,data.link)
    },
    handleLikeClick: (like) => {
      if(like.classList.contains('card__like_active')){
        api.deleteLike(data._id)
          .then(data => {
            card.updateLikesLength(data.likes)
          })
          .catch(err => console.log(err));
      } else {
        api.addLike(data._id)
          .then(data => {
            card.updateLikesLength(data.likes)
          })
          .catch((err) => {console.log(err)});
      }
    },
    handleDeleteIconClick: () => {
      deleteConfirmation.setEventListeners(removeCard(data._id, card));
      deleteConfirmation.open();
    }
  });
  return card.generateCard();
}

const userProfile = new UserInfo({userNameSelector:'.profile__name', userInfoSelector:'.profile__info', userAvatarSelector: '.profile__avatar'});
//загружаем карточки с сервера и вставляем в разметку
api.getAllInitialData()
  .then((data) => {
    const [ initialCards, userProfileData] = data;
    const cardList = new Section({
      items: initialCards,
      renderer:(item) => {
        const cardElement = createCard(item);
        cardList.addItem(cardElement);
      }
    }, '.cards');
    cardList.renderItems();

    userProfile.setUserInfo(userProfileData.name, userProfileData.about, userProfileData.avatar);
  })
  .catch((err) => {console.log(err)});

//меняем состояние кнопки в зависимости от валидности формы
function checkButtonState(popup, validation, form) {
  const submitButton = popup.querySelector(validationConfig.submitButtonSelector);
  validation.buttonState(submitButton, form.checkValidity());
}

export const popupImg = new PopupWithImage('.popup_image');

const popupProfileEditor = new PopupWithForm('.popup_edit-profile', (data) => {
  renderLoading(true, profileSubmitButton);
  api.updateProfileInfo(data)
  .then((data)=> {
      //вставляем данные с полей ввода в текст разметки
      userProfile.updateUserProfile(data.name, data.about);
  })
  .catch((err) => {console.log(err)})
  .finally(() => {
    renderLoading(false, profileSubmitButton, 'Сохранение');
  });
});

const avatarEditor= new PopupWithForm('.popup_avatar', (data) => {
  renderLoading(true, avatarSubmitButton);
  api.updateAvatar(data)
  .then(() => {
    userProfile.updateAvatar(data.avatar)
    avatarEditor.close();
  })
  .finally(() => {
    renderLoading(false, avatarSubmitButton, 'Сохранить');
  });
})

const popupNewPlaceAdder = new PopupWithForm('.popup_add-place', (data) => {
  renderLoading(true, newPlaceSubmitButton);
  //добавялем карточку на сервер и вставляем в разметку
  api.addNewCard(data)
  .then(data=> {
    const newOneCard = createCard(data);
    cardsContainer.prepend(newOneCard);
  })
  .finally(() => {
    renderLoading(false, newPlaceSubmitButton, 'Сохранить');
  });
})

popupImg.setEventListeners();
popupProfileEditor.setEventListeners();
popupNewPlaceAdder.setEventListeners();
avatarEditor.setEventListeners();

profileEditButton.addEventListener('click', ()=>{
  api.getUserInfo()
  .then(data => {
    //подставляем данные пользователя с сервера в значения полей форм
    [inputName.value, inputInfo.value] = [data.name, data.about];
    checkButtonState(popupProfile, profileValidation, profileEditorForm);
    profileValidation.hideError(inputName);
    profileValidation.hideError(inputInfo);
    popupProfileEditor.open();
  })
});

pictureEditButton.addEventListener('click', ()=>{
  checkButtonState(popupNewPlace, placeValidation, newPlaceForm);
  placeValidation.hideError(newPlaceInputName);
  placeValidation.hideError(newPlaceInputLink);
  popupNewPlaceAdder.open();
});

avatarElement.addEventListener('click', ()=>{
  checkButtonState(popupAvatar, avatarValidation, avatarEditorForm);
  avatarValidation.hideError(avatarInput);
  avatarEditor.open();
});

const placeValidation = new FormValidator(validationConfig, newPlaceForm);
placeValidation.enableValidation();

const profileValidation = new FormValidator(validationConfig, profileEditorForm);
profileValidation.enableValidation();

const avatarValidation = new FormValidator(validationConfig, avatarEditorForm);
avatarValidation.enableValidation();
