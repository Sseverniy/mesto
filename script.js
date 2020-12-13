const popupProfile = document.querySelector('.popup_edit-profile');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileCloseButton = popupProfile.querySelector('.popup__close-button');
const profileName = document.querySelector('.profile__name');
const inputName = popupProfile.querySelector('.popup__input_profile_name');
const profileInfo = document.querySelector('.profile__info');
const inputInfo = popupProfile.querySelector('.popup__input_profile_info');
const profileEditorformElement = popupProfile.querySelector('.popup__form');

const pictureEditButton = document.querySelector('.profile__button');
const popupNewPlace = document.querySelector('.popup_add-place');
const newPlaceCloseButton = popupNewPlace.querySelector('.popup__close-button');
const cardsContainer = document.querySelector('.cards');
const newPlaceFormElement = popupNewPlace.querySelector('.popup__form');
const template = document.querySelector('.template');
const popupImgTitle = document.querySelector('.popup__image-heading');
const popupImgBlock = document.querySelector('.popup_image');
const imgCloseButton = popupImgBlock.querySelector('.popup__close-button');
const newPlaceInputName = document.querySelector('.popup__input_picture_name');
const newPlaceInputLink = document.querySelector('.popup__input_picture_link');

function addInitialCards() {
  const cards = initialCards.map(makeCards);
  cardsContainer.append(...cards);
}

function makeCards(item) {
  const newCard = template.content.cloneNode(true);
  const cardName = newCard.querySelector('.card__place-name');
  cardName.textContent = item.name;
  const cardImgById = newCard.getElementById('card-image');
  cardImgById.src = item.link;
  cardImgById.alt = item.name;
 
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
    const popupFullSizeImg = document.getElementById('popup-picture');
    popupFullSizeImg.src = item.link;
    popupFullSizeImg.alt = item.name;
    
    openPopup(popupImgBlock);
  });
  return newCard;
}

function openProfileEditor() {
  inputName.value = profileName.textContent;
  inputInfo.value = profileInfo.textContent;
  openPopup(popupProfile);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function profileEditorSubmitHandler (event) {
    event.preventDefault();

    profileName.textContent = inputName.value;
    profileInfo.textContent = inputInfo.value;
    
    closePopup(popupProfile);
}

function picFormSubmitHandler (event) {
  event.preventDefault();

  const newOneCard = makeCards({name:newPlaceInputName.value, link:newPlaceInputLink.value});
  cardsContainer.prepend(newOneCard);
  
  newPlaceFormElement.reset();
  closePopup(popupNewPlace);
}

addInitialCards();

profileEditButton.addEventListener('click', openProfileEditor);
profileCloseButton.addEventListener('click', function() {
  closePopup(popupProfile)});
profileEditorformElement.addEventListener('submit', profileEditorSubmitHandler); 

pictureEditButton.addEventListener('click', function() {
  openPopup(popupNewPlace)});
newPlaceCloseButton.addEventListener('click', function() {
  closePopup(popupNewPlace)});
imgCloseButton.addEventListener('click', function() {
  closePopup(popupImgBlock)});
newPlaceFormElement.addEventListener('submit', picFormSubmitHandler);
