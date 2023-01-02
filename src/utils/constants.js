//Конфиг
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
};

const apiConfig = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-56',
  headers: {
    'authorization': '92d2b0f4-0f2d-4b0a-a7d7-4567fc3463f5',
    'Content-Type': 'application/json'
  },
}

const avatar = document.querySelector('.profile__avatar');
const buttonAddCard = document.querySelector('.profile__add-button');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonUpdateAvatar = document.querySelector('.profile__avatar-edit-button');
const formEditProfile = document.querySelector('[name="edit-form"]');
const formAddCard = document.querySelector('[name="add-form"]');
const formUpdateAvatar = document.querySelector('[name="avatar-form"]');
const nameInput = formEditProfile.querySelector('.popup__input_field_name');
const jobInput = formEditProfile.querySelector('.popup__input_field_job');

export {validationConfig,
    apiConfig,
    avatar, 
    buttonAddCard, 
    buttonEditProfile,
    buttonUpdateAvatar, 
    formEditProfile,
    formAddCard,
    formUpdateAvatar,
    nameInput, 
    jobInput}