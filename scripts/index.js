//Попапы
const popupAddCard = document.querySelector('.popup_action_add-place');
const popupEditProfile = document.querySelector('.popup_action_edit-profile');
const popupViewPicture = document.querySelector('.popup_action_view-photo');

//Кнопки
const buttonAddCard = document.querySelector('.profile__add-button');
const buttonsClosePopup = document.querySelectorAll('.popup__close');
const buttonEditProfile = document.querySelector('.profile__edit-button');

//Форма редактирования профиля
const formEditProfile = document.querySelector('[name="edit-form"]');
const nameInput = formEditProfile.querySelector('.popup__input_field_name');
const jobInput = formEditProfile.querySelector('.popup__input_field_job');
const nameInfo = document.querySelector('.profile__name');
const jobInfo = document.querySelector('.profile__job');

//Форма добавления карточки
const formAddCard = document.querySelector('[name="add-form');
const placeNameInputElement = formAddCard.querySelector('.popup__input_field_place-name');
const placeImageInputElement = formAddCard.querySelector('.popup__input_field_image-link');
const templateCardElement = document.querySelector('.template-card');
const cardsElement = document.querySelector('.elements');

//Окно просмотра фото
const photoElement = popupViewPicture.querySelector(".popup__image");
const photoCaptionElement = popupViewPicture.querySelector(".popup__figcaption");

//Открытие и закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEsc);
  popup.removeEventListener('click', handleOverlayClick);
};

function handleEsc(evt) {
  if (evt.key === 'Escape') {
    const currentPopup = document.querySelector('.popup_opened');
    closePopup(currentPopup);
  }
};

function handleOverlayClick(evt) {
  const currentPopup = document.querySelector('.popup_opened');
  if (evt.target === currentPopup){
    closePopup(currentPopup);
  }
};

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEsc);
  popup.addEventListener('click', handleOverlayClick);
};

buttonsClosePopup.forEach((button) =>{
  const popupElement = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popupElement));
 });

 //Редактирование профиля
buttonEditProfile.addEventListener('click', () =>{
  openPopup(popupEditProfile);
  deactivateButton(popupEditProfile, validationCongig);
  nameInput.value = nameInfo.textContent;
  jobInput.value = jobInfo.textContent;
});

const handleEditFormSubmit = (evt) =>{
  evt.preventDefault();
  nameInfo.textContent = nameInput.value;
  jobInfo.textContent = jobInput.value;
  closePopup(popupEditProfile);
};
  
formEditProfile.addEventListener('submit', handleEditFormSubmit);
  
//Добавление карточки c возможностью лайкать и удалять
buttonAddCard.addEventListener('click', () => {
  openPopup(popupAddCard);
  deactivateButton(popupAddCard, validationCongig);
});

const handleAddSubmit = (evt) =>{
  evt.preventDefault();
  const name = placeNameInputElement.value;
  const link = placeImageInputElement.value;
  addCard(name, link);
  closePopup(popupAddCard);
  evt.target.reset()
};

const handleDelete = (evt) =>{
  evt.target.closest('.element').remove();
};

const handleLike = (evt) =>{
  evt.target.classList.toggle('element__like_active');
};

const handlePhotoView = (name, link) =>{
  photoElement.src = link;
  photoElement.alt = name;
  photoCaptionElement.textContent = name;
  openPopup(popupViewPicture);
}

function createCard(name, link) {
  const cardElement = templateCardElement.content.querySelector('.element').cloneNode(true);
  const cardImageElement = cardElement.querySelector('.element__image');

  cardElement.querySelector('.element__title').textContent = name;
  cardImageElement.src = link;
  cardImageElement.alt = name;
    
  cardElement
      .querySelector('.element__delete')
      .addEventListener('click', handleDelete);

  cardElement
      .querySelector('.element__like')
      .addEventListener('click', handleLike);

  cardImageElement
      .addEventListener('click', () => handlePhotoView(name, link));

  return cardElement
}

const addCard = function (name, link) {
  const newCardElement = createCard(name, link)
  cardsElement.prepend(newCardElement);
};

formAddCard.addEventListener('submit', handleAddSubmit);

//Добавление дефолтных карточек
initialCards.forEach((item) => {
  addCard(item.name, item.link);
});
