import './index.css';

//Импорт констант
import {initialCards, 
  validationConfig, 
  formEditProfile,
  formAddCard,
  buttonAddCard, 
  buttonEditProfile, 
  nameInput, 
  jobInput, 
  placeImageInputElement, 
  placeNameInputElement} from '../utils/constants.js'

//Импорт модулей
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';

//Попапы
const popupAddCard = new PopupWithForm('.popup_action_add-place', handleAddSubmit);
popupAddCard.setEventListeners();
const popupEditProfile = new PopupWithForm('.popup_action_edit-profile', handleEditFormSubmit);
popupEditProfile.setEventListeners();
const popupViewPicture = new PopupWithImage('.popup_action_view-photo');
popupViewPicture.setEventListeners();

//Добавление дефолтных карточек

function renderCard(item) {
  const newCard = createCard(item);
  cardsElement.addItem(newCard);
}

const cardsElement = new Section({
  items: initialCards, 
  renderer: renderCard,
}, 
'.elements');

cardsElement.renderItems();

//Валидация форм

const profileValidation = new FormValidator(validationConfig, formEditProfile);
const newCardValidation = new FormValidator(validationConfig, formAddCard);
profileValidation.enableValidation();
newCardValidation.enableValidation(); 


//Редактирование профиля
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  descriptionSelector: '.profile__job'
});


buttonEditProfile.addEventListener('click', () =>{
  const {name, description} = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = description;
  popupEditProfile.open();
  profileValidation.resetValidation();
});

function handleEditFormSubmit (data) {
  userInfo.setUserInfo(data);
};

//Открытие изображения по клику на картинку
function handlePhotoView (name, link) {
    popupViewPicture.open(name,link);
  }

//Добавление карточки
buttonAddCard.addEventListener('click', () => {
  popupAddCard.open();
  newCardValidation.resetValidation();
});


function createCard(item){
    const card = new Card(item, '.template-card', handlePhotoView);
    const cardElement = card.createCard();
    return cardElement;
};

function handleAddSubmit (evt) {
  evt.preventDefault();
  
  const name = placeNameInputElement.value;
  const link = placeImageInputElement.value;
  
  const card = {name, link};
  renderCard(card);
  popupAddCard.close();
};

formAddCard.addEventListener('submit', handleAddSubmit);