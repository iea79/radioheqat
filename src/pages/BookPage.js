import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RestService from '../services/RestService';
import Breadcrumbs from '../components/Breadcrumbs';
import {Book} from '../components/Books';

const restService = new RestService();

const BookPage = () => {
    const { bookId } = useParams();
    const [book, setBook] = useState([]);

    console.log('getBook');
    console.log(book);

    useEffect(() => {
        if (book.length === 0) {
            getBook();
        }
    });

    const getBook = () => {
        restService.getBookPage(bookId)
        .then(data => {
            console.log(data);
            setBook(data);
        });
    };

    const renderCover = (cover) => {
        console.log(cover);
        if (cover) {
            return <img src={process.env.PUBLIC_URL + '/images/books/' + cover} alt=""/>;
        }
    }

    return (
        <main className="main">
            <div className="bookPage">
                <Breadcrumbs title={book.bookTitle} />
                <div className="page__title">{book.bookTitle}</div>

                <div className="bookPage__item">
                    <Book props={book} />
                </div>
                <div className="page__title">Ավելին գրքի մասին</div>
                <div className="bookPage__foot">
                    <div className="bookPage__cover">
                        {renderCover(book.bookCover)}
                    </div>
                    <div className="bookPage__descr">
                        <div className="bookPage__list">
                            <dl>
                                <dt>Վերնագիր՝ </dt>
                                <dd>Դավիթ Սասունսկի</dd>
                            </dl>
                            <dl>
                                <dt>Հեղինակ՝ </dt>
                                <dd>ժողովրդական հեքիաթ</dd>
                            </dl>
                            <dl>
                                <dt>Կարդում է՝ </dt>
                                <dd>Անուն Ազգանուն</dd>
                            </dl>
                            <dl className="dlCol">
                                <dt>Գրքի սյուժեն</dt>
                                <dd>«Սասունցի Դավիթը» աշխույժ արձագանքն է Հայաստանում 9-րդ դարում տեղի ունեցած իրադարձություններին։ Ինչպես մյուս ժողովուրդների էպոսը, այնպես էլ հայոց էպոսն ի սկզբանե եզակի ու բաղկացուցիչ բան չէր։ Ըստ պրոֆեսոր Կ.Մելիք-Օղանջանյանի, այն բաղկացած է երեք վիպական ստեղծագործություններից, որոնք սկզբում գոյություն են ունեցել ինքնուրույն՝ լեգենդները Սանասար և Բաղդասար եղբայրների՝ «Սասունի տան հիմնադիրների» մասին, Մհեր Ավագի և Մհերի Կրտսերի </dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default BookPage;
