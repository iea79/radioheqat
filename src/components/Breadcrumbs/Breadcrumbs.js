import React from 'react';
import { Link } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
// import RestService from '../../services/RestService';

import './Breadcrumbs.scss';

// const restService = new RestService();


const Breadcrumbs = ({title}) => {
    const routes = [
        { path: '/books/:bookId', breadcrumb: title },
    ];

    const breadcrumbs = useBreadcrumbs(routes);

    // const breadcrumbLen = breadcrumbs.length;

    // console.log(breadcrumbs);
    // console.log(breadcrumbs.length);

    return (
        <div className="breadcrumb">
            <ul>
                {
                    breadcrumbs.map(({ breadcrumb, match }) => {
                        // console.log(breadcrumb);
                        // console.log(match);
                        let path = match.pathname;
                        if (breadcrumbs.length > 2) {
                            path = match.pathname + '/';
                        }
                        return (
                            <li key={match.pathname}>
                                <Link to={path}>{breadcrumb}</Link>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
}
export default Breadcrumbs;
