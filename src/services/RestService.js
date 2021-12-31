// import React from 'react';

export default class RestService {

    // _server = 'https://radioheqat.koorochka.com';
    // _server = 'http://localhost:3004';
    _server = 'http://radioheqat.frontendie.ru:3004';

    async getResource(url) {

        const res = await fetch(`${this._server}${url}`);

        if (!res.ok) {
            throw new Error('Error')
        }

        return await res.json();
    }

    async loginUser(data) {
        console.log(data);
        if (data['user-email'] === '' || data['user-email'].length < 3) {
            console.log('Wrong Email');
            return {error: 'Wrong Email'};
        }

        if (data['user-password'] === '') {
            console.log('Wrong Password');
            return {error: 'Wrong Password'};
        }

        const res = await fetch(`${this._server}/auth/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(data => data.json())


        // Эмуль ответа с токеном
        // const res = {token: 'test123'};
        // Эмуль ответа с ошибкой
        // const res = {error: 'Error error error error error!!!'};

        console.log(res);

        return await res;
    }

    async registerUser(data) {
        console.log(data);
        if (data['user-name'] === '' || data['user-name'].length < 3) {
            console.log('Wrong Name');
            return {error: 'Wrong Name'};
        }

        if (data['user-email'] === '' || data['user-email'].length < 3) {
            console.log('Wrong Email');
            return {error: 'Wrong Email'};
        }

        if (data['user-password'] !== data['confirm-password']) {
            console.log('Password Conform Wrong');
            return {error: 'Password Conform Wrong'};
        }

        const token = await fetch(`${this._server}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(data => data.json())

        return await token;
    }

    async getBooksList(ids) {
        // const list = await fetch(`${this._server}/books`)
        let arr = '';
        if (ids) {
            ids.forEach((item) => {
                arr += `id=${item}&`;
            });
            console.log(arr);
        }
        const list = await fetch(`${this._server}/books?${arr}`)
            .then(data => data.json());

        console.log(list);

        return await list;
    }

    async addToHistoryList(userId, bookId) {
        // const list = await fetch(`${this._server}/books`)
        const current = await fetch(`${this._server}/history/${userId}`)
            .then(data => data.json());

        // let book;

        if (current.history) {
            const newArr = [...new Set(current.history.concat([bookId]))];
            // console.log(newArr);

            await fetch(`${this._server}/history/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"id": userId, "history": newArr})
            })
        } else {
            // console.log('not history');
            await fetch(`${this._server}/history/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"id": userId, "history": [bookId]})
            })
        }
    }

    async getHistoryList(userId) {
        // const list = await fetch(`${this._server}/books`)
        const list = await fetch(`${this._server}/history/${userId}`)
            .then(data => data.json());

        console.log(list.history);
        // console.dir(list);

        return await list.history;
    }

    async getFavoriteList() {
        // const list = await fetch(`${this._server}/books`)
        const list = await fetch(`${this._server}/books`)
            .then(data => data.json());

        console.log(list);

        return await list;
    }

    async getBookPage(id) {
        // console.log(id);
        const res = await fetch(`${this._server}/books/${id}`)
            .then(data => data.json());

        return res;
    }
}
