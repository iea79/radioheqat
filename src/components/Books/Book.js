import React from 'react';
import { Link } from 'react-router-dom';
import AudioPlayer from '../AudioPlayer';

const Book = (props) => {
    const {id, bookTitle, bookAudio, bookImage, author, authorPhoto, authorDescr} = props.props;

    let img, photo, audio;
    // const image return ;
    if (bookImage && bookImage !== "") {
        img = <img src={process.env.PUBLIC_URL + '/images/books/' + bookImage} alt=""/>;
    }

    if (authorPhoto && authorPhoto !== "") {
        photo = <img src={process.env.PUBLIC_URL + '/images/authors/' + authorPhoto} alt=""/>;
    }

    if (bookAudio && bookAudio !== "") {
        audio = process.env.PUBLIC_URL + '/audio/' + bookAudio;
        // console.log(audio);
    }

    return (
        <div key={id} className="books__item">
            <div className="books__content">
                <Link to={"/books/" + id} className="books__title">{bookTitle}</Link>
                <div className="books__player">
                    <AudioPlayer path={audio} id={id} author={author} />
                </div>
                <div className="books__spacer"></div>
                <div className="books__author">
                    <div className="books__photo">{photo}</div>
                    <div className="books__info">
                        <div className="books__name">{author}</div>
                        <div className="books__descr">{authorDescr}</div>
                    </div>
                </div>
            </div>
            <div className="books__image">
                <Link to={"/books/" + id}>
                    {img}
                </Link>
            </div>
        </div>
    )
}

export default Book;
