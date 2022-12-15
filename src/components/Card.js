export class Card {
    constructor(data, templateSelector, handleCardClick) {
      this._name = data.name;
      this._link = data.link;
      this._templateSelector = templateSelector;
      this.handleCardClick = handleCardClick;
    };
  
    _getTemplate() {
      const cardElement = document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);
  
      return cardElement;
    };

    createCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector('.element__title').textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
    
        return this._element;
    };

    _setEventListeners() {
        this._cardImage = this._element.querySelector('.element__image');
        this._likeButton = this._element.querySelector('.element__like');

        this._element
            .querySelector('.element__delete')
            .addEventListener('click', () => (this._handleDelete()));

        this._likeButton.addEventListener('click', () => (this._handleLike()));

        this._cardImage.addEventListener('click', () => (this.handleCardClick(this._name, this._link)));
    };

    _handleDelete() {
        this._element.remove();
        this._element = null;
    };
      
    _handleLike() {
        this._likeButton.classList.toggle('element__like_active');
    };
  }