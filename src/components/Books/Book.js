import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import parser from 'html-react-parser';
import AudioPlayer from '../AudioPlayer';
import RestService from '../../services/RestService';
import { setFavorites } from '../../actions/actions';
import Lottie from 'lottie-react';

const restService = new RestService();

const Book = ({props}) => {
    const bookId = props;
    // console.log(bookId);
    const { token, userId, userFavorites } = useSelector(state => state);
    // console.log(userFavorites);
    const [ book, setBook ] = useState(false);
    const [ anim, setAnim ] = useState(false);
    const [ active, setActive ] = useState(userFavorites.includes(`${bookId}`));
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const lottieRef = useRef();

    // console.log('active', active);

    useEffect(()=>{
        if (!book) {
            restService.getBook(bookId).then(json => {
                // console.log(json);
                setBook(json);
                setAnim(json.media.lotty);
            })
        }
    }, [ book, anim ]);

    const addToFavorite = () => {
        setActive(!active);
        restService.addToFavoritList(userId, bookId, token)
        .then(json => {
            console.log(json);
            if (json.code === 200) {
                if (json.data) {
                    dispatch(setFavorites(json.data));
                }
            }
        }).catch(err => {
            console.log(err);
        });
    };

    const startAnimation = () => {
        if (anim) {
            lottieRef.current.play();
        }
    };

    const pauseAnimation = () => {
        if (anim) {
            lottieRef.current.pause();
        }
    };

    if (!book) return false;

    return (
        <div key={bookId} className="books__item"
            onMouseEnter={() => {startAnimation()}}
            onMouseLeave={() => {pauseAnimation()}}
            >
            <div className="books__content">
                <Link to={"/book/" + bookId} className="books__title">{ parser(book.title.rendered) }</Link>
                <div className="books__player">
                    <AudioPlayer path={book.media.audio} id={bookId} author={book.author.name} />
                </div>
                <div className="books__spacer"></div>
                <div className="books__author">
                    <div className="books__photo">
                        <img src={book.author.photo} alt=""/>
                    </div>
                    <div className="books__info">
                        <div className="books__name">{book.author.name}</div>
                        <div className="books__descr">{book.author.read_by}</div>
                    </div>
                </div>
            </div>
            <div className="books__image">
                <Link to={"/book/" + bookId}>
                    { book.media.image && !anim ? <img src={ book.media.image } alt=""/> : '' }
                    { anim ? <Lottie
                                className="anim"
                                lottieRef={lottieRef}
                                animationData={anim}
                                autoplay={false}
                            />
                    : '' }
                </Link>
            </div>
            {
                token ?
                    <span
                        className={active ? "favorite active" : "favorite"}
                        onClick={ () => {addToFavorite()}}></span>
                    : ''
            }

        </div>
    )
}

export default Book;
