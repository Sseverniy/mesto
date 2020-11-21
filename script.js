let popup = document.querySelector('.popup');
let profileNameSpanButton = document.querySelector('.profile__name_span_button');
let saveButton = document.querySelector('.popup__save-button');
let closeButton = document.querySelector('.popup__close-button');
let profileName = document.querySelector('.profile__name');
let inputName = document.querySelector('.popup__input');
let profileInfo = document.querySelector('.profile__info');
let inputInfo = document.querySelectorAll('.popup__input')[1];


profileNameSpanButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

let formElement = document.querySelector('.popup__form');

function formSubmitHandler (event) {
    event.preventDefault();
    let nameInput =  document.querySelector('.popup__input');// Воспользуйтесь инструментом .querySelector()
    let jobInput = document.querySelectorAll('.popup__input')[1];
    
    profileName.textContent = nameInput.value
    profileInfo.textContent = jobInput.value
    
    popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler); 

function openPopup() {
  popup.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputInfo.value = profileInfo.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}
