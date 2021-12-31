import React, { useEffect, useState } from 'react';
// import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import Book from './Book';

const BooksPaginated = ({booksPerPage, books}) => {
    // console.log(books);

    const [currentBooks, setCurrentBooks] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [bookOffset, setBookOffset] = useState(0);

    useEffect(() => {
        if (books.length) {
            const endOffset = bookOffset + booksPerPage;

            setCurrentBooks(books.slice(bookOffset, endOffset));
            setPageCount(Math.ceil(books.length / booksPerPage));
        }
    }, [bookOffset, booksPerPage, books]);

    const renderList = (currentBooks) => {
        if (currentBooks.length) {
            return currentBooks.map((data, key) => <Book key={key} props={data} />);
        }
    }

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * booksPerPage) % books.length;
        setBookOffset(newOffset);
    };

    return (
        <div className="books__list">
            {renderList(currentBooks)}
            {
                pageCount > 1 ?
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=""
                    containerClassName={"pagination"}
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
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
