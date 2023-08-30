/* eslint-disable react/no-array-index-key */
import { useState } from 'react';
import { Pagination, Scrollbar, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import './book-slider.css';

import 'swiper/css';
import 'swiper/css/pagination';

export const BookSlider = (props: { imgArr: Array<{ url: string }> }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [activeSlide, setActiveSlide] = useState<any>();

  return (
    <div className='book-slider__box'>
      <Swiper
        data-test-id='slide-big'
        spaceBetween={10}
        slidesPerView={1}
        modules={[Thumbs, Pagination]}
        pagination={{
          clickable: true,
        }}
        thumbs={activeSlide ? { swiper: activeSlide } : undefined}
        grabCursor={true}
        className='book-slider'
      >
        {props.imgArr.map((item, index) => (
          <SwiperSlide key={index} className='book-slide'>
            <div className='book-slide-img__box'>
              <img className='book-slide-img' alt='book' src={item.url} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        spaceBetween={30}
        slidesPerView={5}
        onSwiper={(swiper) => setActiveSlide(swiper)}
        modules={[Thumbs, Scrollbar]}
        scrollbar={{ draggable: true }}
        centerInsufficientSlides={true}
        grabCursor={true}
        className='book-slider-thumbs'
      >
        {props.imgArr.map((item, index) => (
          <SwiperSlide key={index} className='book-slide-thumb' data-test-id='slide-mini'>
            <div className='book-slide-thumb__img-box'>
              <img className='book-slide-thumb__img' alt='book' src={item.url} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
