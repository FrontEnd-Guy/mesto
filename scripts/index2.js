let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = popup.querySelector('.popup__close');
let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__input_field_name');
let jobInput = formElement.querySelector('.popup__input_field_job');
let nameInfo = document.querySelector('.profile__name');
let jobInfo = document.querySelector('.profile__job');


const openPopup = function() {
  popup.classList.add('popup_opened');
  nameInput.value = nameInfo.textContent;
  jobInput.value = jobInfo.textContent;
}

const closePopup = function() {
  popup.classList.remove('popup_opened');
}


editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

function formSubmitHandler (evt) {
  evt.preventDefault();
  nameInfo.textContent = nameInput.value;
  jobInfo.textContent = jobInput.value;
  closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);

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

const cardsElement = document.querySelector('.elements');

initialCards.forEach((item) => {
  const html = `
    <article class="element">
      <img src="${item.link}" class="element__image">
      <h2 class="element__title">${item.name}</h2>
      <button aria-label='Like' class="element__like" type="button"></button>
    </article>
  `;
  cardsElement.insertAdjacentHTML('afterbegin', html);
});


const templateElement = document.querySelector('.template');

function addCard(name, link) {
  const newCardElement = templateElement.content.cloneNode(true);
  newCardElement.querySelector('.element__title').textContent = name;
  newCardElement.querySelector('.element__image').src = link;
}

const addButton = document.querySelector('.profile__add-button');
addButton.addEventListener