import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import apiConfig from '@/api/config/apiConfig';
import axiosClient from '@/api/config/axiosClient';
import SliderContent from '@/pages/HomePage/Hero/Slider/SliderContent';
import type {
  MovieDetailWithExtras,
  TrendingItem,
  TrendingItemWithDetail,
  TvDetailWithExtras,
} from '@/types/tmdb.types';

import styles from './Slider.module.scss';

const cx = classNames.bind(styles);

type SliderProps = {
  trendingData: TrendingItem[];
};

const Slider = ({ trendingData }: SliderProps) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [enrichedData, setEnrichedData] = useState<TrendingItemWithDetail[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllDetails = async () => {
      if (trendingData.length === 0) return;

      setLoading(true);

      try {
        const detailsPromises = trendingData.map(async (item): Promise<TrendingItemWithDetail> => {
          try {
            const endpoint = item.media_type === 'movie' ? `movie/${item.id}` : `tv/${item.id}`;
            const appendToResponse =
              item.media_type === 'movie' ? 'release_dates,images' : 'content_ratings,images';

            // ✅ axiosClient đã return response.data
            const detailData = await axiosClient.get(endpoint, {
              params: {
                language: 'vi-VN',
                append_to_response: appendToResponse,
                include_image_language: 'en,null',
              },
            });

            // ✅ Type assertion để TypeScript hiểu đúng
            if (item.media_type === 'movie') {
              console.log(detailData);
              return {
                ...item,
                detailData: detailData as unknown as MovieDetailWithExtras,
              };
            } else {
              return {
                ...item,
                detailData: detailData as unknown as TvDetailWithExtras,
              };
            }
          } catch (error) {
            console.error(`Error fetching detail for ${item.id}:`, error);
            // Return item without detailData nếu lỗi
            return item;
          }
        });

        const results = await Promise.all(detailsPromises);
        setEnrichedData(results);
      } catch (error) {
        console.error('Error fetching all details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllDetails();
  }, [trendingData]);

  const handleThumbnailClick = (index: number) => {
    if (swiperInstance) {
      swiperInstance.slideTo(index);
    }
  };

  if (loading) {
    return (
      <div className={cx('slider', 'loading')}>
        <p>Đang tải slider...</p>
      </div>
    );
  }
  console.log(enrichedData);

  return (
    <div className={cx('slider')}>
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
        {enrichedData.map(item => (
          <SwiperSlide key={item.id}>
            <SliderContent item={item} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={cx('custom-pagination')}>
        {enrichedData.map((item, index) => {
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
