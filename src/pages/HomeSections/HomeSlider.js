import { useState, useEffect, useCallback } from 'react';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import RestService from '../../services/RestService';
import { Book } from '../../components/Books';
// import parse from 'html-react-parser';

import './HomeSlider.scss';

const restService = new RestService();

const HomeSlider = (prop) => {
    const { four_screen_title, four_screen_slider } = prop.props;
    const [books, setBook] = useState([]);

    // console.log(four_screen_slider);

    useEffect(() => {
        if (!books.length) {
            getSlideerBooks();
        }
    }, [books, four_screen_slider]);

    const getSlideerBooks = useCallback(async () => {
        await restService.getBooksList(four_screen_slider)
            .then(json => {
                console.log(json);
                setBook(json);
            }).catch(err => console.log(err));
    }, [])

    return (
        <section className="fourScreen section">
            <div className="container">
                <div className="fourScreen__content">
                    <div className="fourScreen__head">
                        <h2 className="section__title">{ four_screen_title }</h2>
                        <div className="fourScreen__sort"></div>
                    </div>
                    <div className="fourScreen__slider">
                        <Swiper
                            modules={ [Navigation] }
                            navigation
                            spaceBetween={0}
                            slidesPerView={1}
                            breakpoints={{
                                768: {
                                    slidesPerView: 2
                                }
                            }}
                            >
                            {
                                books.map((item, i) => {
                                    return (
                                        <SwiperSlide key={i}>
                                            <Book props={item.id} />
                                        </SwiperSlide>
                                    )
                                })
                            }
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HomeSlider;
