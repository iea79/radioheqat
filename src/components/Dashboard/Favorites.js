import React, { useState, useEffect } from 'react';
import BooksPaginated from '../Books/BooksPaginated';
import RestService from '../../services/RestService';

const restService = new RestService();

const Favorites = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        if (!books.length) {
            getBooks();
        }
        console.log(books);
        console.log('Update book array');
    }, [books])

    const getBooks = () => {
        restService.getFavoriteList()
        .then(json => {
            setBooks(json);
        })
    }

    return (
        <BooksPaginated booksPerPage={8} books={books} />
    )
}

export default Favorites;
