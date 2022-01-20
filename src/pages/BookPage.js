import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import parser from 'html-react-parser';
import RestService from '../services/RestService';
import Breadcrumbs from '../components/Breadcrumbs';
import {Book} from '../components/Books';
import parse from 'html-react-parser';
import { setLoader } from '../actions/actions';

const restService = new RestService();

const BookPage = React.memo( () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userId, token } = useSelector(state => state);
    const { bookId } = useParams();
    const [ book, setBook ] = useState(0);
    // let bookRendered = '';

    // console.log('getBook');
    // console.log(bookId);

    useEffect(() => {
        const addToHistory = () => {
            restService.addToHistoryList(userId, bookId, token)
            .then(json => {
                console.log(json);
            }).catch(err => {
                console.log(err);
            });
        };
        dispatch(setLoader(true));
        if (!book) {
            restService.getBookPage(bookId)
            .then(data => {
                setBook(data);
                // console.log('data', data);
                dispatch(setLoader(false));
                if (token) {
                    addToHistory();
                }
            })
            .catch(() => {
                dispatch(setLoader(false));
                navigate('/404');
            });
        } else {
            dispatch(setLoader(false));
        }
        // console.log(book);
    }, [ book, navigate ]);

    if (!book || !bookId) return false;

    const { title, media, content } = book;

    return (
        <main className="main">
            <div className="bookPage">
                <Breadcrumbs title={ parser(title.rendered) } />
                <div className="page__title">{ parser(title.rendered) }</div>

                <div className="bookPage__item">
                    <Book props={book.id} />
                </div>
                <div className="page__title">Ավելին գրքի մասին</div>
                <div className="bookPage__foot">
                    {media.cover ? <div className="bookPage__cover">
                        <img src={ media.cover } alt=""/>
                    </div> : ''}
                    <div className="bookPage__descr">
                        <div className="bookPage__list">
                            { parse(content.rendered) }
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
} );

export default BookPage;
