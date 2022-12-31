export class Card {
    constructor(
      data,
      userId, 
      templateSelector, 
      handleCardClick, 
      handleDeleteButtonClick,
      handleLikeButtonClick) { 
      this.id = data._id;
      this.likes = data.likes;
      this._name = data.name;
      this._link = data.link;
      this._owner = data.owner._id;
      this._userId = userId;
      this._templateSelector = templateSelector;
      this.handleCardClick = handleCardClick;
      this._handleDeleteButtonClick = handleDeleteButtonClick;
      this._handleLikeButtonClick = handleLikeButtonClick;
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
        this._cardImage = this._element.querySelector('.element__image');
        this._likeButton = this._element.querySelector('.element__like');
        this._likeCounter = this._element.querySelector('.element__like-counter');
        this._deleteButton = this._element.querySelector('.element__delete');
        this._setEventListeners();

        this._element.querySelector('.element__title').textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._likeCounter.textContent = this.likes.length;
        
        if (this._owner != this._userId) {
          this._deleteButton.classList.add('element__delete_hidden')
        }
        
        
        if (this.likes.some((like) => like._id === this._userId)) {
          this._likeButton.classList.add('element__like_active')
        };

    
        return this._element;
    };

    _setEventListeners() {
        this._deleteButton.addEventListener('click', () => {
          this._handleDeleteButtonClick(this);
        });
        this._likeButton.addEventListener('click', () => {
          this._handleLikeButtonClick(this, this._likeCounter);
          this.like();
        });
        this._cardImage.addEventListener('click', () => (this.handleCardClick(this._name, this._link)));
    };

    delete() {
      this._element.remove();
      this._element = null;
      this._cardImage = null;
      this._likeButton = null;
    }
      
    like() {
      this._likeButton.classList.toggle('element__like_active');
    }
  }