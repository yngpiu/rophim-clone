import classNames from 'classnames/bind';
import 'swiper/swiper.css';

import useFetch from '@/hooks/useFetch';
import Slider from '@/pages/HomePage/Hero/Slider';
import type { TMDBResponse, TrendingItem } from '@/types/tmdb.types';

import styles from './Hero.module.scss';

const cx = classNames.bind(styles);

const Hero = () => {
  const { data, loading, error } = useFetch<TMDBResponse<TrendingItem>>('trending/all/week', {
    language: 'vi-VN',
  });

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>Lỗi: {error}</p>;
  return (
    <div className={cx('hero')}>
      <Slider trendingData={data?.results.slice(0, 5) || []} />
    </div>
  );
};
export default Hero;
