import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Book from './Book';

const BooksPaginated = ({booksPerPage, books}) => {
    // console.log(books);
    const [currentBooks, setCurrentBooks] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [bookOffset, setBookOffset] = useState(0);
    // console.log(sortName);
    // console.log(currentBooks);

    useEffect(() => {
        if (books.length) {
            const endOffset = bookOffset + booksPerPage;
            // console.log('trigger');
            setCurrentBooks(books.slice(bookOffset, endOffset));
            setPageCount(Math.ceil(books.length / booksPerPage));
        }
    }, [ bookOffset, booksPerPage, books ]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * booksPerPage) % books.length;
        setBookOffset(newOffset);
    };

    if (!currentBooks.length) return false;

    return (
        <div className="books__list">
            {
                currentBooks.map(({id}) => <Book key={id} props={id} /> )
            }
            {
                pageCount > 1 ?
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=""
                    containerClassName={"pagination"}
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={pageCount}
                    previousLabel=""
                    renderOnZeroPageCount={null}
                />
                : ''
            }
        </div>
    )
}

export default BooksPaginated;
