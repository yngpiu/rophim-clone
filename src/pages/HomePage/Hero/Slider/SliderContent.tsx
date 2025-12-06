import classNames from 'classnames/bind';

import apiConfig from '@/api/config/apiConfig';
import Badge from '@/components/Badge';
import LogoImage from '@/pages/HomePage/Hero/LogoImage';
import type {
  MovieDetailWithExtras,
  TrendingItemWithDetail,
  TvDetailWithExtras,
} from '@/types/tmdb.types';
import { convertMinutesToFilmDuration } from '@/utils/format';

import styles from './Slider.module.scss';

const cx = classNames.bind(styles);

type SliderContentProps = {
  item: TrendingItemWithDetail;
};

const SliderContent = ({ item }: SliderContentProps) => {
  const data = item.detailData;

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

  const title = isMovie ? (data as MovieDetailWithExtras).title : (data as TvDetailWithExtras).name;

  const originalTitle = isMovie
    ? (data as MovieDetailWithExtras).original_title
    : (data as TvDetailWithExtras).original_name;

  const releaseDate = isMovie
    ? (data as MovieDetailWithExtras).release_date
    : (data as TvDetailWithExtras).first_air_date;
  const releaseYear = releaseDate?.split('-')[0] || '';

  let durationOfMovie = '';
  if (isMovie && 'runtime' in data) {
    const movieData = data as MovieDetailWithExtras;
    durationOfMovie = movieData.runtime ? convertMinutesToFilmDuration(movieData.runtime) : '';
  }

  const durationOfTvShow = {
    numberOfEpisodes: 0,
    numberOfSeasons: 0,
  };
  if (!isMovie && 'number_of_episodes' in data && 'number_of_seasons' in data) {
    const tvData = data as TvDetailWithExtras;
    durationOfTvShow.numberOfEpisodes = tvData.number_of_episodes;
    durationOfTvShow.numberOfSeasons = tvData.number_of_seasons;
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
        className={cx('slider__image')}
      />

      <div className={cx('slider__content')}>
        {logoPath && <LogoImage url={logoPath} alt={title} className={cx('slider__film-logo')} />}
        <h2 className={cx('slider__title')}>{title}</h2>
        {originalTitle !== title && (
          <h3 className={cx('slider__original-title')}>{originalTitle}</h3>
        )}

        <div className={cx('slider__badges')}>
          <Badge className={cx('slider__badge', 'slider__imdb-badge')}>
            <span>IMDb</span>
            <span>{data.vote_average.toFixed(1)}</span>
          </Badge>
          {certification && (
            <Badge className={cx('slider__badge', 'slider__certification-badge')}>
              <span>{certification}</span>
            </Badge>
          )}
          {releaseYear && (
            <Badge className={cx('slider__badge')}>
              <span>{releaseYear}</span>
            </Badge>
          )}
          {durationOfMovie && (
            <Badge className={cx('slider__badge')}>
              <span>{durationOfMovie}</span>
            </Badge>
          )}
          {durationOfTvShow.numberOfSeasons > 0 && (
            <Badge className={cx('slider__badge')}>
              <span>{`${durationOfTvShow.numberOfSeasons} mùa`}</span>
            </Badge>
          )}
          {durationOfTvShow.numberOfEpisodes > 0 && (
            <Badge className={cx('slider__badge')}>
              <span>{`${durationOfTvShow.numberOfEpisodes} tập`}</span>
            </Badge>
          )}
        </div>

        {data.overview && <p className={cx('overview')}>{data.overview}</p>}

        <div className={cx('slider__badges')}>
          {data.genres.map(genre => (
            <Badge key={genre.id} className={cx('slider__badge', 'slider__genre-badge')}>
              <span>{genre.name}</span>
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SliderContent;
