export class Card {
    constructor(data, templateSelector) {
      this._name = data.name;
      this._link = data.link;
      this._templateSelector = templateSelector;
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
        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__image').alt = this._name;
    
        return this._element;
    };

    _setEventListeners() {
        this._element
            .querySelector('.element__delete')
            .addEventListener('click', () => (this._handleDelete()));

        this._element
            .querySelector('.element__like')
            .addEventListener('click', () => (this._handleLike()));
    };

    _handleDelete() {
        this._element.remove();
    };
      
    _handleLike() {
        this._element
            .querySelector('.element__like')
            .classList.toggle('element__like_active');
    };
  }