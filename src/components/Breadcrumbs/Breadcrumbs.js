import React from 'react';
import { Link } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';

const Breadcrumbs = () => {
    const breadcrumbs = useBreadcrumbs();

    // const breadcrumbLen = breadcrumbs.length;

    // console.log(breadcrumbs);
    // console.log(breadcrumbs.length);

    return (
        <div className="breadcrumb">
            <ul>
                {
                    breadcrumbs.map(({ breadcrumb, match }) => (
                        <li key={match.pathname}>
                            <Link to={match.pathname}>{breadcrumb}</Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}
export default Breadcrumbs;
