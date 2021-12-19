import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import RestService from '../services/RestService';
// import Book from './Book';
import Breadcrumbs from '../components/Breadcrumbs';
import BooksPaginated from '../components/Books/BooksPaginated';

import '../components/Books/Books.scss';

const restService = new RestService();

// Самый популярный: Недавно добавлено: Армянский народный Давид из Сасуна
const sortsItem = [
    {name: 'Ամենաճանաչված', type: 'popular'},
    {name: 'Նոր ավելացված', type: 'date'},
    {name: 'հայ ժողովրական', type: 'peoples'},
    {name: 'Սասունցի Դավիդ', type: 'author'}
];

const SortBooks = ({sorting}) => {
    const [active, setActive] = useState(0);

    return (
        <div className="sorting">
            {sortsItem.map(({name, type}, i) => (
                <div
                    className={"sorting__item " + (active === i ? "active" : "") }
                    key={name}
                    onClick={() => {
                        sorting(type);
                        setActive(i);
                    }}
                    >
                    {name}
                </div>
            ))}
        </div>
    );
}

const Books = () => {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        if (!books.length) {
            getBooks();
        }
    }, [books])

    const getBooks = () => {
        restService.getMediaList()
        .then(json => {
            setBooks(json);
        })
    }

    const sorting = sorting => {
        switch (sorting) {
            case 'date':
                setBooks([...books].sort((a, b)=> a.publishDate < b.publishDate ? 1 : -1 ))
                break
            case 'author':
                setBooks([...books].sort((a, b)=> a.author < b.author ? 1 : -1 ));
                break
            default:
                return books;
        }
    }

    return (
        <main className="main">
            <div className="books">
                <Breadcrumbs />
                <div className="books__head">
                    <div className="page__title">Բոլոր գրքերը</div>
                    <SortBooks sorting={sorting}/>
                </div>
                <BooksPaginated booksPerPage={9} books={books} />
            </div>
        </main>
    )
}

export default Books;
