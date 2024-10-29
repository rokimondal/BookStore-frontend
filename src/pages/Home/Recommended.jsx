// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation, Mousewheel } from 'swiper/modules';
import BookCard from "../Books/BookCard";
import { useFetchAllBooksQuery } from "../../redux/features/books/booksApi";


const Recommended = () => {
    const { data: books = [], error, isLoading } = useFetchAllBooksQuery();

    if (isLoading) return <></>;
    if (error) return <div>Error fetching books: {error.message}</div>;
    return (
        <div className="py-10">
            <h2 className="text-3xl font-semibold mb-6">Recommended for you </h2>
            <div>
                <Swiper
                    slidesPerView={1}
                    navigation={true}
                    spaceBetween={30}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 2,
                            spaceBetween: 50,
                        },
                        1180: {
                            slidesPerView: 3,
                            spaceBetween: 50,
                        },
                    }}
                    cssMode={true}
                    mousewheel={true}
                    keyboard={true}
                    modules={[Navigation, Mousewheel]}
                    className="mySwiper"
                >
                    {books.length > 0 && books.slice(8, 18).map((book, index) => (
                        <SwiperSlide key={index}>
                            <BookCard book={book} />
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>
        </div>
    )
}

export default Recommended