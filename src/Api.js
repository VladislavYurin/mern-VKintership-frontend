import { idText } from "typescript";

class Api {
    constructor(token) {
        this.path = "http://localhost:4000";
        this.token = token;
    }

    // Регистрация
    register(body) {
        return fetch(`${this.path}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(body)
        })
    }

    // Авторизация
    auth(body) {
        return fetch(`${this.path}/auth`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(body)
        })
    }

    // Получение ползьователя по айди
    getUser(id) {
        return fetch(`${this.path}/user/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
    }

    // Добавление поста
    post(body) {
        return fetch(`${this.path}/post`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(body)
        })
    }

    // Удаление поста
    deletePost(id) {
        return fetch(`${this.path}/post/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
    }

    // Получение поста
    getPost(id) {
        return fetch(`${this.path}/post/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
    }

    // Лайк на пост
    likePost(id, body) {
        return fetch(`${this.path}/post/${id}/like`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(body)
        })
    }

    //Получение 20 новых постов
    getNewPosts(id) {
        return fetch(`${this.path}/feed/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
    }


    //Добавление в друзья
    addFriend(body) {
        return fetch(`${this.path}/friends`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(body)
        })
    }

    //Удаление из друзей
    deleteFriend(body) {
        return fetch(`${this.path}/friends`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(body)
        })
    }

    searchUsers(query) {
        return fetch(`${this.path}/users/search?search=${query}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
    }
}

export default Api;