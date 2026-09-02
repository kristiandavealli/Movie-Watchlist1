import { useState, useEffect } from "react";
import axios from "axios";

function TmdbSearch({ onAddMovie }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const controller = new AbortController();

    const searchMovies = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/search/movie",
          {
            params: {
              api_key: import.meta.env.VITE_TMDB_API_KEY,
              query: query,
            },
            signal: controller.signal,
          }
        );

        setResults(response.data.results);
      } catch (err) {
        if (err.name !== "CanceledError") {
          setError("Failed to fetch movies.");
        }
      } finally {
        setLoading(false);
      }
    };

    searchMovies();

    return () => {
      controller.abort();
    };
  }, [query]);

  const handleAddMovie = (movie) => {
    const newMovie = {
      id: movie.id,
      title: movie.title,
      poster: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "",
      genre: "Unknown",
      year: movie.release_date
        ? movie.release_date.substring(0, 4)
        : "Unknown",
      rating: movie.vote_average
        ? Number(movie.vote_average.toFixed(1))
        : 0,
      watched: false,
    };

    onAddMovie(newMovie);
  };

  return (
    <div>
      <h2>Search TMDB</h2>

      <input
        type="text"
        placeholder="Search for a movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div>
        {results.map((movie) => (
          <div key={movie.id}>
            <h3>{movie.title}</h3>

            <button
              type="button"
              onClick={() => handleAddMovie(movie)}
            >
              Add to Watchlist
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TmdbSearch;