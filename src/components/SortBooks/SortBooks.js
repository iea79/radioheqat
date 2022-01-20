import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import RestService from '../../services/RestService';

const restService = new RestService();

const SortBooks = () => {
    // const [ active, setActive ] = useState(0);
    const [ sorted, setSorted ] = useState([]);

    useEffect(() => {
        if (!sorted.length) {
            restService.getSortingMenu().then(json => {
                console.log(json);
                setSorted(json);
            })
        }
    }, [ sorted ])

    return (
        <div className="sorting">
            {sorted.map(({title, url}, i) => (
                <NavLink
                    className="sorting__item"
                    key={url}
                    to={url}
                    >
                    {title}
                </NavLink>
            ))}
        </div>
    );
}

export default SortBooks;
