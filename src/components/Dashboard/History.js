import React, { useState, useEffect } from 'react';
import BooksPaginated from '../Books/BooksPaginated';
import RestService from '../../services/RestService';
import { useSelector } from 'react-redux';

const restService = new RestService();

const History = () => {
    const { userId } = useSelector(state => state);
    const [books, setBooks] = useState([]);
    // console.log(userId);

    useEffect(() => {
        if (!books.length) {
            getBooks();
        }
        // console.log(books);
        // console.log('Update book array');
    }, [books])

    const getBooks = () => {
        restService.getHistoryList(userId)
        .then(json => {
            if (json && json.length) {
                restService.getBooksList(json).then(data => {
                    setBooks(data);
                })
            }
        })
        // .catch(err => {
        //     setBooks([]);
        // })
    }

    return (
        <BooksPaginated booksPerPage={4} books={books} />
    )
}

export default History;
