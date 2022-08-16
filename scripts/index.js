let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile-info__edit-button');
let closeButton = popup.querySelector('.popup__close');

const togglePopup = function() {
  popup.classList.toggle('popup_opened');
}

editButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', togglePopup);

let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__name');
let jobInput = formElement.querySelector('.popup__job');
let nameInfo = document.querySelector('.profile-info__name');
let jobInfo = document.querySelector('.profile-info__job');

nameInput.value = nameInfo.textContent;
jobInput.value = jobInfo.textContent;

function formSubmitHandler (evt) {
  evt.preventDefault();
  nameInfo.textContent = nameInput.value;
  jobInfo.textContent = jobInput.value;
}

formElement.addEventListener('submit', formSubmitHandler);
