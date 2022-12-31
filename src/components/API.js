export class API {
    constructor(config){
        this.headers = config.headers;
        this.baseUrl = config.baseUrl;
    };

    getUserInfo(){
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'GET',
            headers: this.headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((result) => {
            return result;
        });  
    };

    editUserInfo(data){
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
              })
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((result) => {
            return result;
        }); 
    };  
    
    createCard(card){
        return fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(card),
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((result) => {
            return result;
        }); 
    };

    deleteCard(id){
        return fetch(`${this.baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this.headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((result) => {
            return result;
        }); 
    };

    getCardsList(){
        return fetch(`${this.baseUrl}/cards`, {
            method: 'GET',
            headers: this.headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((result) => {
            return result;
        }); 
    };

    putLike(id){
        return fetch(`${this.baseUrl}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this.headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((result) => {
            return result;
        }); 
    };
    

    deleteLike(id){
        return fetch(`${this.baseUrl}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: this.headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((result) => {
            return result;
        }); 
    };

    updateAvatar(avatar){
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(avatar)
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((result) => {
            return result;
        }); 
    };
}