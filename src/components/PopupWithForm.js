import Popup from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmitForm){
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._formInputList = Array.from(this._form.querySelectorAll('.popup__input'));
        this._handleSubmitForm = handleSubmitForm;
        this._buttonElement = this._form.querySelector('.popup__save-button');
    };

    _getInputValues(){
        const inputValues = {};
        this._formInputList.forEach((input)=>{
            inputValues[input.name] = input.value;
        });
        return inputValues;  
    };

    close(){
        super.close();
        this._form.reset();
    };

    setEventListeners(){
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) =>{
            evt.preventDefault();
            this.renderLoading(true);
            this._handleSubmitForm(this._getInputValues());
        });
    };

    renderLoading(onLoading){
        if (onLoading) {
            this._buttonElement.textContent = 'Сохранение...'
        } else {
            this._buttonElement.textContent = 'Сохранить'
        }
    }
}

