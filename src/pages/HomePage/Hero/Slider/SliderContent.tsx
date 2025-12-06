import classNames from 'classnames/bind';

import apiConfig from '@/api/config/apiConfig';
import Badge from '@/components/Badge';
import useFetchMediaDetail from '@/hooks/useFetchMediaDetail';
import LogoImage from '@/pages/HomePage/Hero/LogoImage';
import type { MovieDetailWithExtras, TrendingItem, TvDetailWithExtras } from '@/types/tmdb.types';
import { convertSecondsToFilmDuration } from '@/utils/format';

import styles from './Slider.module.scss';

const cx = classNames.bind(styles);

type SliderContentProps = {
  item: TrendingItem;
};

const SliderContent = ({ item }: SliderContentProps) => {
  const { data, loading, error } = useFetchMediaDetail({
    mediaType: item.media_type,
    mediaId: item.id,
  });

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>Lỗi: {error}</p>;
  if (!data) return null;

  const isMovie = item.media_type === 'movie';

  // ✅ Title từ data
  const title = isMovie ? (data as MovieDetailWithExtras).title : (data as TvDetailWithExtras).name;

  // ✅ Original title từ data
  const originalTitle = isMovie
    ? (data as MovieDetailWithExtras).original_title
    : (data as TvDetailWithExtras).original_name;

  // ✅ Release year từ data
  const releaseDate = isMovie
    ? (data as MovieDetailWithExtras).release_date
    : (data as TvDetailWithExtras).first_air_date;
  const releaseYear = releaseDate?.split('-')[0] || '';

  // ✅ Runtime từ data
  let runtime = '';
  if (isMovie && 'runtime' in data) {
    const movieData = data as MovieDetailWithExtras;
    runtime = movieData.runtime ? convertSecondsToFilmDuration(movieData.runtime) : '';
  } else if (!isMovie && 'episode_run_time' in data) {
    const tvData = data as TvDetailWithExtras;
    const avgRuntime = tvData.episode_run_time?.[0] || 0;
    runtime = avgRuntime ? `${avgRuntime}ph/tập` : '';
  }

  const logos = data.images?.logos || [];
  const logoPath =
    logos.find(logo => logo.iso_639_1 === 'en')?.file_path ||
    logos.find(logo => logo.iso_639_1 === null)?.file_path ||
    logos[0]?.file_path ||
    null;

  let certification = '';
  if (isMovie && 'release_dates' in data) {
    const usRelease = data.release_dates?.results.find(r => r.iso_3166_1 === 'US');
    certification = usRelease?.release_dates?.[0]?.certification || '';
  } else if (!isMovie && 'content_ratings' in data) {
    const usRating = data.content_ratings?.results.find(r => r.iso_3166_1 === 'US');
    certification = usRating?.rating || '';
  }

  return (
    <div className={cx('slider__container')}>
      <img
        src={apiConfig.backdropSizes.original(data.backdrop_path)}
        alt={title}
        className={cx('slider_image')}
      />

      <div className={cx('slider__content')}>
        {/* Logo hoặc title */}
        {logoPath ? (
          <LogoImage url={logoPath} alt={title} />
        ) : (
          <h2 className={cx('slider__title')}>{title}</h2>
        )}

        {/* Original title nếu khác */}
        {originalTitle !== title && (
          <h3 className={cx('slider__original-title')}>{originalTitle}</h3>
        )}

        {/* Badges */}
        <div className={cx('badges')}>
          <Badge>
            <span>IMDb </span>
            <span>{data.vote_average.toFixed(1)}</span>
          </Badge>

          {certification && (
            <Badge>
              <span>{certification}</span>
            </Badge>
          )}

          <Badge>
            <span>{releaseYear}</span>
          </Badge>

          {runtime && (
            <Badge>
              <span>{runtime}</span>
            </Badge>
          )}
        </div>

        {/* Overview */}
        <p className={cx('overview')}>{data.overview}</p>

        {/* Genres */}
        <div className={cx('genres')}>
          {data.genres.map(genre => (
            <span key={genre.id} className={cx('genre')}>
              {genre.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SliderContent;
