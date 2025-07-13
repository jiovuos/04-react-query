import axios from 'axios';
import type { MovieSearchResponse } from '../types/api';

const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (
  query: string,
  page: number
): Promise<MovieSearchResponse> => {
  const response = await axios.get<MovieSearchResponse>(
    `${BASE_URL}/search/movie`,
    {
      params: {
        query,
        page,
      },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    }
  );

  return response.data;
};
