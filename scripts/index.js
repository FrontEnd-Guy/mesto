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

//Попапы
const addPopup = document.querySelector('.popup_action_add-place');
const editPopup = document.querySelector('.popup_action_edit-profile');
const photoPopup = document.querySelector('.popup_action_view-photo');

//Кнопки
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');
const editButton = document.querySelector('.profile__edit-button');

//Форма редактирования профиля
const editFormElement = document.querySelector('[name="edit-form"]');
const nameInput = editFormElement.querySelector('.popup__input_field_name');
const jobInput = editFormElement.querySelector('.popup__input_field_job');
const nameInfo = document.querySelector('.profile__name');
const jobInfo = document.querySelector('.profile__job');

//Форма добавления карточки
const addFormElement = document.querySelector('[name="add-form');
const placeNameInputElement = addFormElement.querySelector('.popup__input_field_place-name');
const placeImageInputElement = addFormElement.querySelector('.popup__input_field_image-link');
const templateCardElement = document.querySelector('.template-card');
const cardsElement = document.querySelector('.elements');

//Окно просмотра фото
const photoElement = photoPopup.querySelector(".popup__image");
const photoCaptionElement = photoPopup.querySelector(".popup__figcaption");

//Открытие и закрытие попапа
const openPopup = (popup) =>{
  popup.classList.add('popup_opened');
};

const closePopup = (popup) =>{
  popup.classList.remove('popup_opened');
};

closeButtons.forEach((button) =>{
  const popupElement = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popupElement));
 });

//Редактирование профиля
editButton.addEventListener('click', () =>{
  openPopup(editPopup);
  nameInput.value = nameInfo.textContent;
  jobInput.value = jobInfo.textContent;
});

const handleEditFormSubmit = (evt) =>{
  evt.preventDefault();
  nameInfo.textContent = nameInput.value;
  jobInfo.textContent = jobInput.value;
  closePopup(editPopup);
};
  
editFormElement.addEventListener('submit', handleEditFormSubmit);
  
//Добавление карточки c возможностью лайкать и удалять
addButton.addEventListener('click', () => openPopup(addPopup));

const handleAddSubmit = (evt) =>{
  evt.preventDefault();
  const name = placeNameInputElement.value;
  const link = placeImageInputElement.value;
  addCard(name, link);
  closePopup(addPopup);
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
  openPopup(photoPopup);
}

function createCard(name, link) {
  const cardElement = templateCardElement.content.cloneNode(true);
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

addFormElement.addEventListener('submit', handleAddSubmit);

//Добавление дефолтных карточек
initialCards.forEach((item) => {
  addCard(item.name, item.link);
});
