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
  document.addEventListener('keydown', keyHandler);
  popup.addEventListener('click', closeByOverlayClick)
}

function closeByOverlayClick(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function profileEditorSubmitHandler(event) {
  event.preventDefault();

  profileName.textContent = inputName.value;
  profileInfo.textContent = inputInfo.value;

  closePopup(popupProfile);
}

function picFormSubmitHandler (event) {
  event.preventDefault();

  const newOneCard = makeCards({name:newPlaceInputName.value, link:newPlaceInputLink.value});
  cardsContainer.prepend(newOneCard);
  
  newPlaceForm.reset();
  closePopup(popupNewPlace);
}

function keyHandler(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup)
  }
}

addInitialCards();

profileEditButton.addEventListener('click', openProfileEditor);
profileCloseButton.addEventListener('click', function() {
  closePopup(popupProfile)});
profileEditorForm.addEventListener('submit', profileEditorSubmitHandler); 

pictureEditButton.addEventListener('click', function() {
  openPopup(popupNewPlace)});
newPlaceCloseButton.addEventListener('click', function() {
  closePopup(popupNewPlace)});
imgCloseButton.addEventListener('click', function() {
  closePopup(popupImgBlock)});
newPlaceForm.addEventListener('submit', picFormSubmitHandler);
