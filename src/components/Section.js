export class Section {
    constructor({renderer}, containerSelector){
        // this._renderedItems = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    };
    
    addItem(element) {
        this._container.prepend(element);
    };

    renderItems(renderedItems){
        renderedItems.reverse().forEach(this._renderer);
    };
}