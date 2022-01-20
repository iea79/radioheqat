import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import RestService from '../services/RestService';

const restService = new RestService();

const SinglePage = () => {

    const [ page, getPage ] = useState(null);
    const { slugName } = useParams('');
    const navigate = useNavigate();
    // console.log(slugName);

    useEffect(() => {
        if (slugName === 'book') {
            return navigate('/books');
        }
        if (!page) {
            // console.log('getPage');
            restService.getPage(slugName).then(json => {
                // console.log(json);
                if (json.length) {
                    getPage(json[0]);
                } else {
                    navigate('/404');
                }
            });
        }
    }, [ page, slugName, navigate ]);

    if (!page) return false;

    return (
        <main className="main">
            <div className="page">
                <h1 className="page__title">{ page.title.rendered }</h1>
                <div className="page__content">{ parse( page.content.rendered ) }</div>
            </div>
        </main>
    )
}

export default SinglePage;
