import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import RestService from '../services/RestService';
// import Book from './Book';
import Breadcrumbs from '../components/Breadcrumbs';
import BooksPaginated from '../components/Books/BooksPaginated';

import '../components/Books/Books.scss';

const restService = new RestService();

const types = ['Ամենաճանաչված', 'Նոր ավելացված', 'հայ ժողովրական', 'Սասունցի Դավիդ'];

const Books = () => {

    const [active, setActive] = useState(types[0]);
    const [books, setBooks] = useState([]);
    const [sorted, sortBooks] = useState(books);

    useEffect(() => {
        if (!books.length) {
            getBooks();
        }
        console.log(books);
        console.log('Update book array');
    }, [books])

    const getBooks = () => {
        restService.getMediaList()
        .then(json => {
            setBooks(json);
        })
    }

    const sortFromDate = () => {
        console.log('sort');
        // console.log(books);
        const sorts = books.sort((a,b)=>{
            const dateA = +a.publishDate;
            const dateB = +b.publishDate;
            // console.log(dateA);
            // console.log(dateB);
            return dateB - dateA;
        });

        sortBooks(sorts);
        setBooks(sorted);
    }

    // const diff = (a, b) => {
    //     return a.filter(i=>!b.includes(i)).concat(b.filter(i=>!a.includes(i)))
    // }
    // console.log(books);

    const tabGroup = () => {
      return (
        <>
          <div className="sorting">
            {types.map(type => (
              <div
                className={"sorting__item " + (active === type ? "active" : "") }
                key={type}
                // active={active === type}
                onClick={() => setActive(type)}
              >
                {type}
              </div>
            ))}
          </div>
        </>
      );
    }

    return (
        <div className="books">
            <Breadcrumbs />
            <div className="books__head">
                <div className="page__title">Բոլոր գրքերը</div>
                {tabGroup()}
            </div>
            <BooksPaginated booksPerPage={9} books={books} />
        </div>
    )
}

export default Books;
