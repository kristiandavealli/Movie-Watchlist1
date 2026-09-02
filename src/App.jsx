import { useEffect, useState } from "react";
import { searchMovies, toWatchlistMovie } from "./api/tmdb";

import Header from "./components/Header";
import Greeting from "./components/Greeting";
import Button from "./components/Button";
import Footer from "./components/Footer";
import MovieList from "./components/MovieList";
import AddMovieForm from "./components/AddMovieForm";
import FilterBar from "./components/FilterBar";
import SummaryBar from "./components/SummaryBar";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";

function App() {
  // Task 3: Restore filter from localStorage
  const [filter, setFilter] = useState(() => {
    return localStorage.getItem("filter") || "all";
  });

  // Task 1: Restore movies from localStorage
  const [movies, setMovies] = useState(() => {
    const saved = localStorage.getItem("movies");

    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            title: "Inception",
            poster:
              "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
            genre: "Sci-Fi",
            year: 2010,
            rating: 9,
            watched: true,
          },
          {
            id: 2,
            title: "Interstellar",
            poster:
              "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
            genre: "Sci-Fi",
            year: 2014,
            rating: 10,
            watched: false,
          },
          {
            id: 3,
            title: "The Dark Knight",
            poster:
              "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
            genre: "Action",
            year: 2008,
            rating: 9,
            watched: true,
          },
        ];
  });

  // NEW TMDB search state
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch TMDB search results
  useEffect(() => {
    if (!searchTerm) return;

    let isCancelled = false;

    const fetchResults = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const movies = await searchMovies(searchTerm);

        if (!isCancelled) {
          setResults(movies);
        }
      } catch (err) {
        if (!isCancelled) {
          setError("Failed to fetch movies. Try again.");
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchResults();

    return () => {
      isCancelled = true;
    };
  }, [searchTerm]);

  // Save movies whenever they change
  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
  }, [movies]);

  // Update browser tab title
  useEffect(() => {
    document.title = `Movie Watchlist (${movies.length})`;
  }, [movies.length]);

  // Save filter whenever it changes
  useEffect(() => {
    localStorage.setItem("filter", filter);
  }, [filter]);

  // Toggle Watched
  const handleToggleWatched = (id) => {
    setMovies(
      movies.map((movie) =>
        movie.id === id
          ? { ...movie, watched: !movie.watched }
          : movie
      )
    );
  };

  // Delete Movie
  const handleDeleteMovie = (id) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  // Add Movie manually
  const handleAddMovie = (newMovie) => {
    setMovies([...movies, newMovie]);
  };

  // Add movie from TMDB search
  const handleAddFromSearch = (tmdbMovie) => {
    // Avoid adding duplicates
    if (movies.some((movie) => movie.id === tmdbMovie.id)) {
      return;
    }

    const watchlistMovie = toWatchlistMovie(tmdbMovie);

    setMovies([...movies, watchlistMovie]);
  };

  // Clear All
  const handleClearAll = () => {
    if (confirm("Clear your entire watchlist? This cannot be undone.")) {
      setMovies([]);
    }
  };

  // Filter Movies
  const visibleMovies = movies.filter((movie) => {
    if (filter === "watched") return movie.watched;
    if (filter === "unwatched") return !movie.watched;
    return true;
  });

  return (
    <div className="container">
      <Header />

      <SummaryBar movies={movies} />

      <button
        className="btn btn-error btn-sm"
        onClick={handleClearAll}
      >
        Clear All
      </button>

      <Greeting />

      <Button />

      {/* TMDB Search */}
      <SearchBar onSearch={setSearchTerm} />

      {isLoading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      <SearchResults
        results={results}
        onAdd={handleAddFromSearch}
      />

      <AddMovieForm onAddMovie={handleAddMovie} />

      <FilterBar
        currentFilter={filter}
        onChangeFilter={setFilter}
      />

      <MovieList
        movies={visibleMovies}
        onToggleWatched={handleToggleWatched}
        onDelete={handleDeleteMovie}
      />

      <Footer />
    </div>
  );
}

export default App;