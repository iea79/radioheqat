import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import RestService from '../../services/RestService';
import Book from './Book';

const restService = new RestService();

const Books = () => {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        if (!books.length) {
            getBooks();
        }
    })

    const getBooks = () => {
        restService.getMediaList()
        .then(json => {
            setBooks(json);
        })
    }

    console.log(books);

    return (
        <div className="book">
            {
                books.map((data, key) => {
                    return  <Book key={key} props={data} />
                })
            }
        </div>
    )
}

export default Books;
