import { useState } from "react";
import BookCard from "../Books/BookCard";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation, Mousewheel } from 'swiper/modules';

import { useFetchAllBooksQuery } from "../../redux/features/books/booksApi";

const TopSellers = () => {
    const category = [
        "Choose genre",
        "Fiction",
        "Horror",
        "Adventure",
        "Non-Fiction",
        "Mystery/Thriller",
        "Science Fiction",
        "Fantasy",
        "Romance",
        "Biography & Memoir",
        "Self-Help",
        "Children’s Books",
        "Young Adult",
        "Historical Fiction",
        "Poetry",
        "Cookbooks",
        "Health & Wellness",
        "Travel",
        "Business & Economics",
        "Graphic Novels/Comics",
        "Religion & Spirituality",
        "Science & Nature",
        "Arts & Photography"
    ];

    const [selectedCategory, setSelectedCategory] = useState("Choose  genre");
    const { data: books = [], error, isLoading } = useFetchAllBooksQuery();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching books: {error.message}</div>;

    const filteredBooks = selectedCategory === "Choose  genre" ? books : books.filter((book) => (
        book.category.toLowerCase() === selectedCategory.toLowerCase()
    ))
    return (
        <div className="py-10">
            <h2 className="text-3xl font-semibold mb-6">Top Sellers</h2>
            <div className="mb-8 flex item-center">
                <select onChange={(e) => setSelectedCategory(e.target.value)}
                    name="category" id="category" className="border bg-[#EAEAEA] border-gray-200 rounded-md py-2 px-4 focus:outline-none" >
                    {category.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>
            </div>
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
                    {filteredBooks.length > 0 && filteredBooks.map((book, index) => (
                        <SwiperSlide key={index}>
                            <BookCard book={book} />
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>
        </div>
    )
}

export default TopSellers