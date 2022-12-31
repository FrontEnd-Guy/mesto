// Шесть карточек «из коробки»
/* const initialCards = [
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
*/
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
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__job');
const profileAvatar = document.querySelector('.profile__avatar');
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
    profileName,
    profileDescription,
    profileAvatar,
    nameInput, 
    jobInput}