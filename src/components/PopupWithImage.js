import Popup from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector){
        super(popupSelector);
        this._photoElement = this._popup.querySelector(".popup__image");
        this._photoCaptionElement = this._popup.querySelector(".popup__figcaption");
    };

    open(name, link){
        this._photoElement.src = link;
        this._photoElement.alt = name;
        this._photoCaptionElement.textContent = name;
        super.open();
    }
}