export class UserInfo {
    constructor({nameSelector, descriptionSelector, avatarSelector}){
        this._name = document.querySelector(nameSelector);
        this._description = document.querySelector(descriptionSelector);
        this._avatar = document.querySelector(avatarSelector);
    };

    getUserInfo(){
        return {
            name: this._name.textContent,
            about: this._description.textContent,
        };
    };

    setUserInfo(data){
        if (data.name) {
            this._name.textContent = data.name;   
        };
        if (data.about) {
            this._description.textContent = data.about;
        };
        if (data.avatar) {
            this._avatar.src = data.avatar;
        };   
    };

}