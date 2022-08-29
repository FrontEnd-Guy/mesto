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
const popup = document.querySelector('.popup');
const addPopup = document.querySelector('.popup_action_add-place');
const editPopup = document.querySelector('.popup_action_edit-profile');
const photoPopup = document.querySelector('.popup_action_view-photo');

//Кнопки
const addButton = document.querySelector('.profile__add-button');
const closeButton = document.querySelectorAll('.popup__close');
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

closeButton.forEach((button) =>{
  const popupElement = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popupElement));
 });

//Редактирование профиля
editButton.addEventListener('click', () =>{
  openPopup(editPopup);
  nameInput.value = nameInfo.textContent;
  jobInput.value = jobInfo.textContent;
});

const editFormSubmitHandler = (evt) =>{
  evt.preventDefault();
  nameInfo.textContent = nameInput.value;
  jobInfo.textContent = jobInput.value;
  closePopup(editPopup);
};
  
editFormElement.addEventListener('submit', editFormSubmitHandler);
  
//Добавление карточки c возможностью лайкать и удалять
addButton.addEventListener('click', () => openPopup(addPopup));

const handleAddSubmit = (evt) =>{
  evt.preventDefault();
  const name = placeNameInputElement.value;
  const link = placeImageInputElement.value;
  addCard(name, link);
  closePopup(addPopup);
  placeNameInputElement.value = '';
  placeImageInputElement.value = '';
};

const handleDelete = (evt) =>{
  const cardElement = evt.target.closest('.element');
  cardElement.remove();
};

const handleLike = (evt) =>{
  evt.target.classList.toggle('element__like_active');
};

const handlePhotoView = (name, link) =>{
  photoElement.src = link;
  photoCaptionElement.textContent = name;
  openPopup(photoPopup);
}

const addCard = function (name, link) {
  const newCardElement = templateCardElement.content.cloneNode(true);
  newCardElement.querySelector('.element__title').textContent = name;
  newCardElement.querySelector('.element__image').src = link;
    
  newCardElement
      .querySelector('.element__delete')
      .addEventListener('click', handleDelete);

  newCardElement
      .querySelector('.element__like')
      .addEventListener('click', handleLike);

  newCardElement
      .querySelector('.element__image')
      .addEventListener('click', () => handlePhotoView(name, link));
   
  cardsElement.prepend(newCardElement);

};

addFormElement.addEventListener('submit', handleAddSubmit);

//Добавление дефолтных карточек
initialCards.forEach((item) => {
  addCard(item.name, item.link);
});
