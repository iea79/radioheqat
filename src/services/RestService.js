const AUTH_KEY_VALUE = 'radioheqatOnline2022';

export default class RestService {

    _wprest = 'https://radioheqiat.fm/wp-json/wp/v2';
    _auth = 'https://radioheqiat.fm/?rest_route=/simple-jwt-login/v1';

    async getResource(url) {

        const res = await fetch(`${this._wprest}${url}`);

        if (!res.ok) {
            throw new Error('Error')
        }

        return await res.json();
    }

    async authUser(data) {
        console.log(data);
        console.log(JSON.stringify(data));
        if (data['email'] === '' || data['email'].length < 3) {
            console.log('Wrong Email');
            return {error: 'Wrong Email'};
        }

        if (data['password'] === '') {
            console.log('Wrong Password');
            return {error: 'Wrong Password'};
        }

        const res = await fetch(`${this._auth}/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'email': data['email'], 'password': data['password'], 'AUTH_KEY': AUTH_KEY_VALUE})
        })


        return await res.json();
    }

    async validateToken(token) {
        const res =  await fetch(`${this._auth}/auth/validate&JWT=${token}`, {
            headers: { 'Authorization': 'Bearer ' + token }
        });

        // return await res.text();
        return await res.json();
    }

    async refreshToken(token) {
        const res =  await fetch(`${this._auth}/auth/refresh&JWT=${token}&AUTH_KEY=${AUTH_KEY_VALUE}`, {
            method: 'POST',
            headers: {"Authorization": "Bearer " + token}
        });
        return await res.json();
    }

    async revokeToken(token) {
        const res =  await fetch(`${this._auth}/auth/revoke&JWT=${token}&AUTH_KEY=${AUTH_KEY_VALUE}`, {
            method: 'POST',
            headers: {"Authorization": "Bearer " + token}
        });
        return await res.json();
    }

    async loginUser(token) {
        const res =  await fetch(`${this._auth}/autologin&JWT=${token}&AUTH_KEY=${AUTH_KEY_VALUE}`, {
            headers: { 'Authorization': 'Bearer ' + token }
        });

        return await res.json();
    }

    async registerUser(data) {
        console.log(data);
        if (data['username'] === '' || data['username'].length < 2) {
            return {error: 'Name is too short'};
        }

        if (data['email'] === '' || data['email'].length < 5) {
            return {error: 'Wrong Email'};
        }

        if (data['password'].length < 8) {
            console.log('Password Conform Wrong');
            return {error: 'This is a very simple password. <br>Please enter at least 8 characters.'};
        }

        if (data['password'] !== data['confirm-password']) {
            console.log('Password Conform Wrong');
            return {error: 'Password Conform Wrong'};
        }

        const request = await fetch(`${this._auth}/users&email=${data['email']}&password=${data['password']}&user_nicename=${data['username']}&display_name=${data['username']}&AUTH_KEY=${AUTH_KEY_VALUE} `, {
            method: 'POST',
        })

        return await request.json();
    }

    async editPassword(data, email, token) {
        console.log(data);
        if (data['newpassword'] === '') {
            console.log('New password field is empty');
            return {error: 'New password field is empty'};
        }

        if (data['newpassword'].length < 8) {
            console.log('Password Conform Wrong');
            return {error: 'This is a very simple password. <br>Please enter at least 8 characters.'};
        }

        if (data['newpassword'] !== data['confirm-password']) {
            console.log('Password Conform Wrong');
            return {error: 'Password Conform Wrong'};
        }

        const resp = await fetch(`${this._auth}/user/reset_password&email=${email}&new_password=${data['newpassword']}&AUTH_KEY=${AUTH_KEY_VALUE}`, {
            method: 'POST',
            headers: {
                // 'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            // body: JSON.stringify({ "password": data.newpassword })
        })

        return await resp.json();
    }

    async getUser(userId, token) {
        const resp = await fetch(`${this._wprest}/users/${userId}`, {
            headers: {
                "Authorization": "Bearer " + token
            },
        })

        return await resp.json();
    }

    async editEmail(userId, email, token) {
        const resp = await fetch(`${this._wprest}/users/${userId}?email=${email}`, {
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + token
            },
        })

        return await resp.json();
    }

    async editName(userId, name, token) {
        const resp = await fetch(`${this._wprest}/users/${userId}?name=${name}`, {
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + token
            },
        })

        return await resp.json();
    }

    async editPhone(userId, phone, token) {
        const resp = await fetch(`${this._wprest}/users/${userId}?phone=${phone}`, {
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + token
            },
        })

        return await resp.json();
    }

    async getBooksList(ids) {
        let arr = '';
        if (ids) {
            ids.forEach((item) => {
                arr += `include[]=${item}&`;
            });
            console.log(arr);
        }
        const list = await fetch(`${this._wprest}/books?${arr}`)

        // console.log(list);

        return await list.json();
    }

    async getBook(id) {
        const list = await fetch(`${this._wprest}/books/${id}`)

        // console.log(list);

        return await list.json();
    }

    async getBooks(params) {
        const list = await fetch(`${this._wprest}/books/${params}`)

        // console.log(list);

        return await list.json();
    }

    async getPage(slug) {
        const list = await fetch(`${this._wprest}/pages/?slug=${slug}`)

        // console.log(list);

        return await list.json();
    }

    async addToHistoryList(userId, bookId, token) {
        const put = await fetch(`${this._wprest}/users/history`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({"userId": userId, "postId": bookId})
        })

        return await put.json();
    }

    async addToFavoritList(userId, bookId, token) {
        const put = await fetch(`${this._wprest}/users/favorites/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({"userId": userId, "postId": bookId})
        })

        return await put.json();
    }

    async getHistoryList(userId, token) {
        if (!userId) return false;

        const list = await fetch(`${this._wprest}/users/history/?userId=${userId}`, {
            headers: {
                "Authorization": "Bearer " + token,
            }
        });

        // console.log(list);

        return await list.json();
    }

    async getFavoriteList(userId, token) {
        if (!userId) return false;

        const list = await fetch(`${this._wprest}/users/favorites?userId=${userId}`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        // console.log(list);

        return await list.json();
    }

    async getPopularBooks() {
        const res = await fetch(`${this._wprest}/books/?book_views_count`)

        return res.json();
    }

    async getBookPage(id) {
        const res = await fetch(`${this._wprest}/books/${id}`)

        return res.json();
    }

    async getMenu() {
        const res = await fetch(`${this._wprest}/menu`)

        return res.json();
    }

    async getSortingMenu() {
        const res = await fetch(`${this._wprest}/sortmenu`)

        return res.json();
    }

    async getDashboardMenu() {
        const res = await fetch(`${this._wprest}/dashmenu`)

        return res.json();
    }

    async getSocMenu() {
        const res = await fetch(`${this._wprest}/socmenu`)

        return res.json();
    }

    async getAppMenu() {
        const res = await fetch(`${this._wprest}/appmenu`)

        return res.json();
    }

}
