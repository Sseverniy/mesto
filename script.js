let popup = document.querySelector('.popup');
let profileEditButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let profileName = document.querySelector('.profile__name');
let inputName = document.querySelector('.popup__input_profile_name');
let profileInfo = document.querySelector('.profile__info');
let inputInfo = document.querySelector('.popup__input_profile_info');
let formElement = document.querySelector('.popup__form');

function openPopup() {
  inputName.value = profileName.textContent;
  inputInfo.value = profileInfo.textContent;
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (event) {
    event.preventDefault();

    profileName.textContent = inputName.value;
    profileInfo.textContent = inputInfo.value;
    
    closePopup();
}

profileEditButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler); 


