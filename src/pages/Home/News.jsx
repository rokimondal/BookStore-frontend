// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation, Mousewheel } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getNewsImgUrl } from '../../utils/getNewsImgUrl';

const News = () => {
    const [news, setNews] = useState([]);
    useEffect(() => {
        fetch("news.json")
            .then(res => res.json())
            .then(data => setNews(data));
    }, []);
    return (
        <div className="py-10">
            <h2 className="text-3xl font-semibold mb-6">News</h2>
            <div className='px-10'>
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
                    }}
                    cssMode={true}
                    mousewheel={true}
                    keyboard={true}
                    modules={[Navigation, Mousewheel]}
                    className="mySwiper"
                >
                    {news.length > 0 && news.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className='flex flex-col sm:flex-row sm:justify-between items-center'>
                                <div className='py-4'>
                                    <Link>
                                        <h3 className='text-lg font-medium text-gray-800 hover:text-gray-300 mb-4'>{item.title}</h3>
                                    </Link>
                                    <div className='w-[80px] h-[4px] rounded-lg bg-primary mb-5'></div>
                                    <p className='text-sm text-gray-500'>{item.description}</p>
                                </div>
                                <div className='flex-shrink-0 rounded-lg'>
                                    <img src={getNewsImgUrl(item.image)} alt={item.image} className='w-full object-cover overflow-hidden' />
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>
        </div>
    )
}

export default News;