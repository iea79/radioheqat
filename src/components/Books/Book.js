import React from 'react';
import {Link} from 'react-router-dom';

const Book = (props) => {
    const {id, title, author} = props.props;

    return (
        <Link to={id} className="book__item">
            <div className="book__content">
                <div className="book__title">{title}</div>
                <div className="book__player"></div>
                <div className="book__author">
                    <div className="book__photo"></div>
                    <div className="book__info">
                        <div className="book__name">{author}</div>
                        <div className="book__descr"></div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Book;
