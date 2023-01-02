import Popup from "./Popup.js";

export class PopupWithConfirmation extends Popup {
    constructor(popupSelector){
        super(popupSelector);
        this._buttonSubmit = this._popup.querySelector('.popup__save-button');
    };

    open(handleSubmit){
        super.open();
        this._handleSubmit = handleSubmit;
    };

    close(){
        super.close();
        this._handleSubmit = undefined;
    };

    setEventListeners(){
        super.setEventListeners()
        this._buttonSubmit.addEventListener('click', (evt) => {
            evt.preventDefault();
            this._handleSubmit();
        })
    };
}