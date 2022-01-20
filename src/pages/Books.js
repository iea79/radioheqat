import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import BooksPaginated from '../components/Books/BooksPaginated';
import SortBooks from '../components/SortBooks';
import { useParams } from 'react-router-dom';
import { setLoader } from '../actions/actions';
import RestService from '../services/RestService';

import '../components/Books/Books.scss';

const restService = new RestService();

const Books = () => {

    const [ books, setBooks ] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { sortName } = useParams();

    useEffect(() => {
        const getSoartableList = (name) => {
            dispatch(setLoader(true));
            restService.getBooks(`?orderby=${name}`).then(json => {
                // console.log(json);
                // if (json.data.status === 400) {
                //     dispatch(setLoader(false));
                // }
                dispatch(setLoader(false));
                setBooks(json);
            }).catch(err => {
                // console.log(err);
                dispatch(setLoader(false));
                setBooks([]);
            });
        }
        if (!sortName) {
            navigate('popular');
        } else {
            // console.log(sortName);
            if (sortName) {
                getSoartableList(sortName);
            } else {
                setBooks([]);
                dispatch(setLoader(false));
            }
        }
    }, [ navigate, sortName, dispatch ]);

    if (!books) return false;

    return (
        <main className="main">
            <div className="books">
                <Breadcrumbs />
                <div className="books__head">
                    <div className="page__title">Բոլոր գրքերը</div>
                    <SortBooks />
                </div>
                <BooksPaginated booksPerPage={9} books={books} />
            </div>
        </main>
    )
}

export default Books;
