import React, { useState, useEffect, useCallback } from 'react';
import BooksPaginated from '../Books/BooksPaginated';
import RestService from '../../services/RestService';
import { useSelector, useDispatch } from 'react-redux';
import { setLoader } from '../../actions/actions';

const restService = new RestService();

const History = () => {
    const { userId, token } = useSelector(state => state);
    const [ books, setBooks ] = useState([]);
    const dispatch = useDispatch();
    // console.log(userId);

    const getBooks = useCallback(() => {
        dispatch(setLoader(true));
        restService.getHistoryList(userId, token)
        .then(json => {
            // dispatch(setLoader(true));
            console.log(json.data);
            if (json.data && json.data.length) {
                restService.getBooksList(json.data).then(data => {
                    setBooks(data);
                    // dispatch(setLoader(false));
                }).catch(() => {
                    // dispatch(setLoader(false));
                });
            }
            dispatch(setLoader(false));
        }).catch(() => {
            dispatch(setLoader(false));
        });
    }, [ userId, token, dispatch ]);

    useEffect(() => {
        if (!books.length) {
            getBooks();
        }
    }, [ books, getBooks ]);


    return (
        <BooksPaginated booksPerPage={4} books={books} />
    );
};

export default History;
