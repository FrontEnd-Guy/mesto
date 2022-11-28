// Шесть карточек «из коробки»
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

//Конфиг
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
};

//Импорт модулей
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

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
function deactivateButton(popup, config) {
    const button = popup.querySelector(config.submitButtonSelector);
    button.setAttribute('disabled', '');
    button.classList.add(config.inactiveButtonClass);
};

buttonEditProfile.addEventListener('click', () =>{
  openPopup(popupEditProfile);
  deactivateButton(popupEditProfile, validationConfig);
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

//Валидация форм
const formList = document.querySelectorAll(validationConfig.formSelector);
formList.forEach((formElement) =>{
    const formValidator = new FormValidator(validationConfig, formElement);
    formValidator.enableValidation();
});

//Открытие изображения по клику на картинку
const handlePhotoView = (name, link) =>{
    photoElement.src = link;
    photoElement.alt = name;
    photoCaptionElement.textContent = name;
    openPopup(popupViewPicture);
  }

//Добавление карточки
buttonAddCard.addEventListener('click', () => {
  openPopup(popupAddCard);
  deactivateButton(popupAddCard, validationConfig);
});

const handleAddSubmit = (evt) =>{
  evt.preventDefault();
  const name = placeNameInputElement.value;
  const link = placeImageInputElement.value;
  addCard(name, link);
  closePopup(popupAddCard);
  evt.target.reset()
};

function addCard(item) {
    const card = new Card(item, '.template-card');
    const cardElement = card.createCard();
    cardElement
        .querySelector('.element__image')
        .addEventListener('click', () => handlePhotoView(item.name, item.link));
    cardsElement.prepend(cardElement);
};

formAddCard.addEventListener('submit', handleAddSubmit);

//Добавление дефолтных карточек

initialCards.forEach((item) => {
    addCard(item);
});
