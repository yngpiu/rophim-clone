/**
 * ======================
 * BASE TYPES
 * ======================
 */

export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface ApiParams {
  page?: number;
  language?: string;
  query?: string;
  append_to_response?: string;
  include_image_language?: string;
  [key: string]: string | number | undefined;
}

/**
 * ======================
 * SHARED TYPES
 * ======================
 */

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

/**
 * ======================
 * IMAGE TYPES
 * ======================
 */

export interface ImageItem {
  aspect_ratio: number;
  height: number;
  iso_3166_1: string | null;
  iso_639_1: string | null;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface Images {
  backdrops: ImageItem[];
  logos: ImageItem[];
  posters: ImageItem[];
}

/**
 * ======================
 * CERTIFICATION TYPES
 * ======================
 */

export interface ReleaseDate {
  certification: string;
  descriptors: string[];
  iso_639_1: string;
  note: string;
  release_date: string;
  type: number;
}

export interface ReleaseDateResult {
  iso_3166_1: string;
  release_dates: ReleaseDate[];
}

export interface ReleaseDates {
  results: ReleaseDateResult[];
}

export interface ContentRatingResult {
  iso_3166_1: string;
  rating: string;
}

export interface ContentRatings {
  results: ContentRatingResult[];
}

/**
 * ======================
 * TRENDING TYPES
 * ======================
 */

export interface BaseTrendingItem {
  adult?: boolean;
  backdrop_path: string | null;
  id: number;
  overview: string;
  poster_path: string | null;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  vote_average: number;
  vote_count: number;
}

export interface TrendingMovie extends BaseTrendingItem {
  media_type: 'movie';
  title: string;
  original_title: string;
  release_date: string;
  video: boolean;
}

export interface TrendingTvShow extends BaseTrendingItem {
  media_type: 'tv';
  name: string;
  original_name: string;
  first_air_date: string;
  origin_country: string[];
}

export type TrendingItem = TrendingMovie | TrendingTvShow;

/**
 * ======================
 * DETAIL TYPES
 * ======================
 */

export interface BaseDetail {
  adult: boolean;
  backdrop_path: string | null;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  vote_average: number;
  vote_count: number;
}

export interface MovieDetail extends BaseDetail {
  belongs_to_collection: null | {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
  };
  imdb_id: string;
  origin_country: string[];
  original_title: string;
  release_date: string;
  revenue: number;
  runtime: number;
  title: string;
  video: boolean;
}

export interface TvShowDetail extends BaseDetail {
  created_by: {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string | null;
  }[];
  episode_run_time: number[];
  first_air_date: string;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: null | object;
  name: string;
  next_episode_to_air: null | object;
  networks: ProductionCompany[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_name: string;
  seasons: {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    season_number: number;
    vote_average: number;
  }[];
  type: string;
}

/**
 * ======================
 * EXTENDED DETAIL TYPES (with append_to_response)
 * ======================
 */

export interface MovieDetailWithExtras extends MovieDetail {
  release_dates?: ReleaseDates;
  images?: Images;
}

export interface TvDetailWithExtras extends TvShowDetail {
  content_ratings?: ContentRatings;
  images?: Images;
}

/**
 * ======================
 * ENRICHED TYPES (Trending + Detail)
 * ======================
 */

export interface TrendingMovieWithDetail extends TrendingMovie {
  detailData?: MovieDetailWithExtras;
}

export interface TrendingTvShowWithDetail extends TrendingTvShow {
  detailData?: TvDetailWithExtras;
}

// ✅ Union type cho slider
export type TrendingItemWithDetail = TrendingMovieWithDetail | TrendingTvShowWithDetail;
