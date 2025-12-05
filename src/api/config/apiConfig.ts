const apiConfig = {
  baseUrl: 'https://api.themoviedb.org/3/',

  // Poster sizes
  posterSizes: {
    w92: (imgPath: string | null): string =>
      imgPath ? `https://image.tmdb.org/t/p/w92${imgPath}` : '',
    w154: (imgPath: string | null): string =>
      imgPath ? `https://image.tmdb.org/t/p/w154${imgPath}` : '',
    w185: (imgPath: string | null): string =>
      imgPath ? `https://image.tmdb.org/t/p/w185${imgPath}` : '',
    w342: (imgPath: string | null): string =>
      imgPath ? `https://image.tmdb.org/t/p/w342${imgPath}` : '',
    w500: (imgPath: string | null): string =>
      imgPath ? `https://image.tmdb.org/t/p/w500${imgPath}` : '',
    w780: (imgPath: string | null): string =>
      imgPath ? `https://image.tmdb.org/t/p/w780${imgPath}` : '',
    original: (imgPath: string | null): string =>
      imgPath ? `https://image.tmdb.org/t/p/original${imgPath}` : '',
  },

  // Backdrop sizes
  backdropSizes: {
    w300: (imgPath: string | null): string =>
      imgPath ? `https://image.tmdb.org/t/p/w300${imgPath}` : '',
    w780: (imgPath: string | null): string =>
      imgPath ? `https://image.tmdb.org/t/p/w780${imgPath}` : '',
    w1280: (imgPath: string | null): string =>
      imgPath ? `https://image.tmdb.org/t/p/w1280${imgPath}` : '',
    original: (imgPath: string | null): string =>
      imgPath ? `https://image.tmdb.org/t/p/original${imgPath}` : '',
  },

  // Profile sizes (cho ảnh diễn viên)
  profileSizes: {
    w45: (imgPath: string | null): string =>
      imgPath ? `https://image.tmdb.org/t/p/w45${imgPath}` : '',
    w185: (imgPath: string | null): string =>
      imgPath ? `https://image.tmdb.org/t/p/w185${imgPath}` : '',
    h632: (imgPath: string | null): string =>
      imgPath ? `https://image.tmdb.org/t/p/h632${imgPath}` : '',
    original: (imgPath: string | null): string =>
      imgPath ? `https://image.tmdb.org/t/p/original${imgPath}` : '',
  },

  // Logo sizes
  logoSizes: {
    w45: (imgPath: string | null): string =>
      imgPath ? `https://image.tmdb.org/t/p/w45${imgPath}` : '',
    w92: (imgPath: string | null): string =>
      imgPath ? `https://image.tmdb.org/t/p/w92${imgPath}` : '',
    w154: (imgPath: string | null): string =>
      imgPath ? `https://image.tmdb.org/t/p/w154${imgPath}` : '',
    w185: (imgPath: string | null): string =>
      imgPath ? `https://image.tmdb.org/t/p/w185${imgPath}` : '',
    w300: (imgPath: string | null): string =>
      imgPath ? `https://image.tmdb.org/t/p/w300${imgPath}` : '',
    w500: (imgPath: string | null): string =>
      imgPath ? `https://image.tmdb.org/t/p/w500${imgPath}` : '',
    original: (imgPath: string | null): string =>
      imgPath ? `https://image.tmdb.org/t/p/original${imgPath}` : '',
  },

  // Shortcuts cho convenience
  poster: (imgPath: string | null): string =>
    imgPath ? `https://image.tmdb.org/t/p/w500${imgPath}` : '',
  backdrop: (imgPath: string | null): string =>
    imgPath ? `https://image.tmdb.org/t/p/w1280${imgPath}` : '',
  profile: (imgPath: string | null): string =>
    imgPath ? `https://image.tmdb.org/t/p/w185${imgPath}` : '',
  original: (imgPath: string | null): string =>
    imgPath ? `https://image.tmdb.org/t/p/original${imgPath}` : '',
};

export default apiConfig;
