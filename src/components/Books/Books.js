// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import RestService from '../../services/RestService';

const restService = new RestService();

const Book = (key, title) => {
    return <div key={key} className="book__item">{title}</div>
}

const Books = () => {

    const renderList = async () => {
        await restService.getMediaList().forEach((item, i) => {
            console.log(item);
        });

    }
    // const list = restService.getMediaList();
    // console.log([list]);

    return (
        <div className="bookList">
            {
                renderList
            }
        </div>
    )
}

export default Books;
