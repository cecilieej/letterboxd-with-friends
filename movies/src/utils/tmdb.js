import axios from 'axios';

const TMDB_API_KEY = import.meta.env.VITE_TMDB_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

/**
 * Search for a movie by title and year
 */
export async function searchMovie(title, year = null) {
  try {
    const params = {
      api_key: TMDB_API_KEY,
      query: title,
      include_adult: false
    };
    
    if (year) {
      params.year = year;
    }
    
    const response = await axios.get(`${BASE_URL}/search/movie`, { params });
    return response.data.results[0] || null; // Return first result
  } catch (error) {
    console.error('TMDb search error:', error);
    return null;
  }
}

/**
 * Get poster URL for a movie
 */
export function getPosterUrl(posterPath) {
  if (!posterPath) return '/placeholder-poster.jpg'; // You can add a placeholder
  return `${IMAGE_BASE}${posterPath}`;
}

/**
 * Enrich movie data with TMDb information
 */
export async function enrichMovieData(movie) {
  const tmdbData = await searchMovie(movie.title, movie.year);
  
  if (tmdbData) {
    return {
      ...movie,
      tmdbId: tmdbData.id,
      poster: getPosterUrl(tmdbData.poster_path),
      overview: tmdbData.overview,
      tmdbRating: tmdbData.vote_average
    };
  }
  
  return {
    ...movie,
    poster: '/placeholder-poster.jpg',
    overview: '',
    tmdbRating: null
  };
}

/**
 * Batch enrich multiple movies (with rate limiting)
 */
export async function enrichMovies(movies, onProgress = null) {
  const enriched = [];
  
  for (let i = 0; i < movies.length; i++) {
    const result = await enrichMovieData(movies[i]);
    enriched.push(result);
    
    if (onProgress) {
      onProgress(i + 1, movies.length);
    }
    
    // Rate limiting: TMDb allows ~40 requests/10 seconds
    if (i % 10 === 0 && i > 0) {
      await new Promise(resolve => setTimeout(resolve, 250));
    }
  }
  
  return enriched;
}