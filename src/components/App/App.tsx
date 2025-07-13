import { useState } from 'react';
import type { Movie } from '../../types/movie';
import { fetchMovies } from '../../services/movieService';
import { Toaster, toast } from 'react-hot-toast';

import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';

import styles from './App.module.css';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    if (query.trim() === '') {
      toast.error('Please enter your search query.');
      return;
    }

    try {
      setIsLoading(true);
      setError(false);
      setMovies([]);

      const fetchedMovies = await fetchMovies(query);

      if (fetchedMovies.length === 0) {
        toast.error('No movies found for your request.');
        return;
      }

      setMovies(fetchedMovies);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => setSelectedMovie(null);

  return (
    <div className={styles.app}>
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={setSelectedMovie} />
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
      <Toaster position="top-center" />
    </div>
  );
}

export default App;
