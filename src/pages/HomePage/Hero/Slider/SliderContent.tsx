import classNames from 'classnames/bind';

import apiConfig from '@/api/config/apiConfig';
import Badge from '@/components/Badge';
import LogoImage from '@/pages/HomePage/Hero/LogoImage';
import type {
  MovieDetailWithExtras,
  TrendingItemWithDetail,
  TvDetailWithExtras,
} from '@/types/tmdb.types';
import { convertSecondsToFilmDuration } from '@/utils/format';

import styles from './Slider.module.scss';

const cx = classNames.bind(styles);

type SliderContentProps = {
  item: TrendingItemWithDetail;
};

const SliderContent = ({ item }: SliderContentProps) => {
  const data = item.detailData;
  console.log(data);

  // Fallback nếu không có detail
  if (!data) {
    return (
      <div className={cx('slider__container')}>
        <img
          src={apiConfig.backdropSizes.original(item.backdrop_path)}
          alt={item.media_type === 'movie' ? item.title : item.name}
          className={cx('slider_image')}
        />
      </div>
    );
  }

  const isMovie = item.media_type === 'movie';

  // Title
  const title = isMovie ? (data as MovieDetailWithExtras).title : (data as TvDetailWithExtras).name;

  // Original title
  const originalTitle = isMovie
    ? (data as MovieDetailWithExtras).original_title
    : (data as TvDetailWithExtras).original_name;

  // Release year
  const releaseDate = isMovie
    ? (data as MovieDetailWithExtras).release_date
    : (data as TvDetailWithExtras).first_air_date;
  const releaseYear = releaseDate?.split('-')[0] || '';

  // Runtime
  let runtime = '';
  if (isMovie && 'runtime' in data) {
    const movieData = data as MovieDetailWithExtras;
    runtime = movieData.runtime ? convertSecondsToFilmDuration(movieData.runtime) : '';
  } else if (!isMovie && 'episode_run_time' in data) {
    const tvData = data as TvDetailWithExtras;
    const avgRuntime = tvData.episode_run_time?.[0] || 0;
    runtime = avgRuntime ? `${avgRuntime}ph/tập` : '';
  }

  // Logo
  const logos = data.images?.logos || [];
  const logoPath =
    logos.find(logo => logo.iso_639_1 === 'en')?.file_path ||
    logos.find(logo => logo.iso_639_1 === null)?.file_path ||
    logos[0]?.file_path ||
    null;

  // Certification
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
