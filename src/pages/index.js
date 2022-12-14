//Импорт файла стилей
import './index.css';

//Импорт констант
import {validationConfig,
  apiConfig, 
  avatar,
  formEditProfile,
  formAddCard,
  formUpdateAvatar,
  buttonAddCard, 
  buttonEditProfile,
  buttonUpdateAvatar, 
  nameInput, 
  jobInput} from '../utils/constants.js'

//Импорт модулей
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import { UserInfo } from '../components/UserInfo.js';
import { API } from '../components/API.js';

//Попапы
const popupAddCard = new PopupWithForm('.popup_action_add-place', handleAddSubmit);
popupAddCard.setEventListeners();
const popupEditProfile = new PopupWithForm('.popup_action_edit-profile', handleEditFormSubmit);
popupEditProfile.setEventListeners();
const popupViewPicture = new PopupWithImage('.popup_action_view-photo');
popupViewPicture.setEventListeners();
const popupDeleteCard = new PopupWithConfirmation('.popup_action_delete-card');
popupDeleteCard.setEventListeners();
const popupUpdateAvatar = new PopupWithForm('.popup_action_update-avatar', handleUpdateAvatarSubmit);
popupUpdateAvatar.setEventListeners();

//Валидация форм
const profileValidation = new FormValidator(validationConfig, formEditProfile);
const newCardValidation = new FormValidator(validationConfig, formAddCard);
const avatarUpdateValidation = new FormValidator(validationConfig, formUpdateAvatar);
profileValidation.enableValidation();
newCardValidation.enableValidation(); 
avatarUpdateValidation.enableValidation();

//Классы
const api = new API(apiConfig);

const cardsElement = new Section({ 
  renderer: renderCard,
}, 
'.elements');

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  descriptionSelector: '.profile__job',
  avatarSelector: '.profile__avatar'
});

//Создание переменной для ID
let myId = 0;

//Отрисовка данных профиля и карточек мест, переопределение ID
Promise.all([api.getUserInfo(), api.getCardsList()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    myId = userData._id;
    cardsElement.renderItems(cards);
  })
  .catch((err) =>{
    console.log(err);
  });

//Добавление дефолтных карточек
function renderCard(item) {
  const newCard = createCard(item);
  cardsElement.addItem(newCard);
}


//Редактирование профиля

buttonEditProfile.addEventListener('click', () =>{
  const {name, about} = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = about;
  popupEditProfile.open();
  profileValidation.resetValidation();
});

function handleEditFormSubmit (data) {
  api.editUserInfo({name: data['edit-name'], about: data['edit-job']})
    .then((result)=>{
      userInfo.setUserInfo(result);
      popupEditProfile.close();
    })
    .catch((err) =>{
      console.log(`Ошибка ${err}`)
    })
    .finally(() =>{
      popupEditProfile.renderLoading(false)
    })
};

//Обновление аватара
buttonUpdateAvatar.addEventListener('click', () => {
  popupUpdateAvatar.open();
  avatarUpdateValidation.resetValidation();
});

function handleUpdateAvatarSubmit(data){
  api.updateAvatar({avatar: data["avatar-link"]}).then((result) => {
    avatar.src = result.avatar;
    popupUpdateAvatar.close();
  })
  .catch((err) =>{
    console.log(`Ошибка ${err}`)
  })
  .finally(() =>{
    popupUpdateAvatar.renderLoading(false)
  })
}

//Открытие изображения по клику на картинку
function handlePhotoView (name, link) {
    popupViewPicture.open(name,link);
  }

//Лайк карточки
function handleLikeButtonClick (card, likesCounter) {

  if (card.likes.some((like) => like['_id'] === myId)){
    api.deleteLike(card.id).then((result) =>{
      card.likes = result.likes;
      likesCounter.textContent = result['likes'].length;
    })
    .catch((err) => {
      console.log(err);
    });
  } else {    
    api.putLike(card.id).then((result) =>{
      card.likes = result.likes;
      likesCounter.textContent = result['likes'].length;
    })
    .catch((err) => {
      console.log(err);
    });
  }

};

//Удаление карточки
function handleDeleteButtonClick(card) {
  popupDeleteCard.open(()=>{
    api.deleteCard(card.id).then(()=>{
      card.delete();
      popupDeleteCard.close();
    })
    .catch((err) => {
      console.log(err);
    });
  });
}

//Добавление карточки
buttonAddCard.addEventListener('click', () => {
  popupAddCard.open();
  newCardValidation.resetValidation();
});


function createCard(item){
    const card = new Card(item, myId, '.template-card', handlePhotoView, handleDeleteButtonClick, handleLikeButtonClick);
    const cardElement = card.createCard();
    return cardElement;
};

function handleAddSubmit (data) {
  api.createCard({name: data['add-place'], link: data['add-link']}).then((card)=>{
    renderCard(card);
    popupAddCard.close();
  })
  .catch((err) =>{
    console.log(`Ошибка ${err}`)
  })
  .finally(() =>{
    popupAddCard.renderLoading(false)
  })

};