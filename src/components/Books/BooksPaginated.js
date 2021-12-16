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
        const endOffset = bookOffset + booksPerPage;

        setCurrentBooks(books.slice(bookOffset, endOffset));
        setPageCount(Math.ceil(books.length / booksPerPage));
        // console.log(currentBooks);

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
            <div className="pagination">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=""
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel=""
                    renderOnZeroPageCount={null}
                />
            </div>
        </div>
    )
}

export default BooksPaginated;
