export default class RestService {

    _server = 'http://localhost:3004';

    async getResource(url, callback) {

        const res = await fetch(`${this._server}${url}`, callback);

        if (!res.ok) {
            throw new Error('Error')
        }

        return await res.json();
    }

    async loginUser(credentials) {
        // console.log(credentials);
        const token = await this.getResource('/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        .then(data => data.json())

        return await token;
    }

    async registerUser(credentials) {
        // console.log(credentials);
        const token = await this.getResource('/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        .then(data => data.json())

        return await token;
    }

    async getMediaList() {
        const list = await this.getResource('/media');

        console.log(list);

        return await list;
    }

    async getMediaItem(id) {
        const res = await this.getResource('/media/');
        const item = res.find( (el) => {
            // console.log(`el.id: ${el.id}, id: ${id}`);
            return el.id === +id;
        })
        console.log(item);
        return item;
    }
}
