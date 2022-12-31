export class UserInfo {
    constructor({nameSelector, descriptionSelector}){
        this._name = document.querySelector(nameSelector);
        this._description = document.querySelector(descriptionSelector);
    };

    getUserInfo(){
        return {
            name: this._name.textContent,
            about: this._description.textContent,
        };
    };

    setUserInfo(data){
        this._name.textContent = data.name;      
        this._description.textContent = data.about;
    };

}