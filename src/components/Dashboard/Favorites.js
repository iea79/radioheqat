import React, { useState, useEffect } from 'react';
import BooksPaginated from '../Books/BooksPaginated';
import RestService from '../../services/RestService';
import { useSelector, useDispatch } from 'react-redux';
import { setLoader, setFavorites } from '../../actions/actions';

const restService = new RestService();

const Favorites = () => {
    const { userId, token, userFavorites } = useSelector(state => state);
    const [ books, setBooks ] = useState(false);
    const dispatch = useDispatch();
    console.log('Favorites', books);
    console.log('Favorites', userFavorites);

    useEffect(() => {
        dispatch(setLoader(true));
        const setFavoritesList = (arr) => {
            restService.getBooksList(arr).then(data => {
                console.log(data);
                setBooks(data);
                dispatch(setLoader(false));
            })
            .catch(() => {
                dispatch(setLoader(false));
            });
        };

        // if (!books) {
        restService.getFavoriteList(userId, token).then(json => {
            console.log(json);
            if (json.data.length) {
                dispatch(setFavorites(json.data));
                setFavoritesList(json.data);
                dispatch(setLoader(false));
            } else {
                dispatch(setLoader(false));
            }
        })
        .catch(() => {
            // setBooks([]);
            dispatch(setLoader(false));
        });
        // } else {
        //     dispatch(setLoader(false));
        // }
        console.log(books);
    }, [ userFavorites.length ]);


    return (
        <BooksPaginated booksPerPage={4} books={books} />
    )
}

export default Favorites;
