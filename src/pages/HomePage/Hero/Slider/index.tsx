import classNames from 'classnames/bind';
import { useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import apiConfig from '@/api/config/apiConfig';
import SliderContent from '@/pages/HomePage/Hero/Slider/SliderContent';
import type { TrendingItem } from '@/types/tmdb.types';

import styles from './Slider.module.scss';

const cx = classNames.bind(styles);

type SliderProps = {
  trendingData: TrendingItem[];
};

const Slider = ({ trendingData }: SliderProps) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const handleThumbnailClick = (index: number) => {
    if (swiperInstance) {
      swiperInstance.slideTo(index);
    }
  };

  return (
    <div>
      <Swiper
        grabCursor={true}
        initialSlide={0}
        slidesPerView={1}
        modules={[EffectFade]}
        effect="fade"
        speed={800}
        loop={false}
        onSwiper={setSwiperInstance}
        onSlideChange={swiper => setActiveIndex(swiper.activeIndex)}
      >
        {trendingData.map(item => (
          <SwiperSlide key={item.id}>
            <SliderContent item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={cx('custom-pagination')}>
        {trendingData.map((item, index) => {
          return (
            <button
              key={item.id}
              className={cx('thumbnail', { active: activeIndex === index })}
              onClick={() => handleThumbnailClick(index)}
              aria-label={`Go to ${item?.media_type === 'movie' ? item?.title : item?.name}`}
            >
              <img
                src={apiConfig.backdropSizes.w300(item.backdrop_path)}
                alt={item?.media_type === 'movie' ? item?.title : item?.name}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default Slider;
