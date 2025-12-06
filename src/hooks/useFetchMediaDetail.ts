import useFetch from '@/hooks/useFetch';
import type { MovieDetailWithExtras, TvDetailWithExtras } from '@/types/tmdb.types';

type UseFetchMediaDetailProps = {
  mediaType: 'movie' | 'tv';
  mediaId: number;
};

const useFetchMediaDetail = ({ mediaType, mediaId }: UseFetchMediaDetailProps) => {
  const { data, loading, error } = useFetch<MovieDetailWithExtras | TvDetailWithExtras>(
    `${mediaType}/${mediaId}`,
    {
      language: 'vi-VN',
      append_to_response: mediaType === 'movie' ? 'release_dates,images' : 'content_ratings,images',
      include_image_language: 'en-US,vi-VN,null',
    }
  );

  return {
    data,
    loading,
    error,
  };
};
export default useFetchMediaDetail;
