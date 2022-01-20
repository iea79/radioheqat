import React from 'react';
import { Link } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
// import RestService from '../../services/RestService';

import './Breadcrumbs.scss';

// const restService = new RestService();

const Breadcrumbs = ({title}) => {
    const routes = [
        { path: 'book', breadcrumb: 'Books' },
        { path: 'book/:bookId', breadcrumb: title },
        { path: 'books/:sortName', breadcrumb: null },
    ];

    const breadcrumbs = useBreadcrumbs(routes);

    return (
        <div className="breadcrumb">
            <ul>
                {
                    breadcrumbs.map(({ breadcrumb, match }) => (
                            <li key={match.pathname}>
                                <Link to={match.pathname}>{breadcrumb}</Link>
                            </li>
                        )
                    )
                }
            </ul>
        </div>
    );
}
export default Breadcrumbs;
