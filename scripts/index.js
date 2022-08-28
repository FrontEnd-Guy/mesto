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
  
  //Форма добавления карточки
  const addPopup = document.querySelectorAll('.popup')[1];
  const addFormElement = document.querySelector('[name="add-form"]');
  const placeNameInputElement = addFormElement.querySelector('.popup__input_field_place-name');
  const placeImageInputElement = addFormElement.querySelector('.popup__input_field_image-link');
  const templateCardElement = document.querySelector('.template-card');

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

  const handleDelete = (evt) =>{
    const cardElement = evt.target.closest('.element');
    cardElement.remove();
  };

  const addCard = function (name, link) {
    const newCardElement = templateCardElement.content.cloneNode(true);
    newCardElement.querySelector('.element__title').textContent = name;
    newCardElement.querySelector('.element__image').src = link;
    
    newCardElement
        .querySelector('.element__delete')
        .addEventListener('click', handleDelete);
    
    const cardLike = newCardElement.querySelector('.element__like').addEventListener('click', function(evt) {
        evt.target.classList.toggle('element__like_active');
    });

    cardsElement.prepend(newCardElement);

  };

  addFormElement.addEventListener('submit', handleAddSubmit);
  
  initialCards.forEach((item) => {
    addCard(item.name, item.link);
  });


