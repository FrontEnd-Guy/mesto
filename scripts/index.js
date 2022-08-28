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
  
  //Форма добавления карточки
  const addPopup = document.querySelectorAll('.popup')[1];
  const addFormElement = document.querySelector('[name="add-form"]');
  const placeNameInputElement = addFormElement.querySelector('.popup__input_field_place-name');
  const placeImageInputElement = addFormElement.querySelector('.popup__input_field_image-link');
  const templateElement = document.querySelector('.template');

  const openAddPopup = function() {
    addPopup.classList.add('popup_opened');
    placeNameInputElement.value = '';
    placeImageInputElement.value = '';
  };
  
  const closeAddPopup = function() {
    addPopup.classList.remove('popup_opened');
  };

  const addButton = document.querySelector('.profile__add-button');
  const closeButton = addPopup.querySelector('.popup__close');

  addButton.addEventListener('click', openAddPopup);
  closeButton.addEventListener('click', closeAddPopup);
  
  const handleAddSubmit = function (evt) {
    evt.preventDefault();
    const name = placeNameInputElement.value;
    const link = placeImageInputElement.value;
    addCard(name, link);
    closeAddPopup();
  };

  const addCard = function (name, link) {
    const newCardElement = templateElement.content.cloneNode(true);
    newCardElement.querySelector('.element__title').textContent = name;
    newCardElement.querySelector('.element__image').src = link;
    cardsElement.prepend(newCardElement);
  };

  addFormElement.addEventListener('submit', handleAddSubmit);
  
