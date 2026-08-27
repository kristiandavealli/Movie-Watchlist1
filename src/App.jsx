import { useState } from "react";
import Header from "./components/Header";
import Greeting from "./components/Greeting";
import Button from "./components/Button";
import Footer from "./components/Footer";
import MovieList from "./components/MovieList";
import AddMovieForm from "./components/AddMovieForm";
import FilterBar from "./components/FilterBar";
import SummaryBar from "./components/SummaryBar";

function App() {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Inception",
      poster: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
      genre: "Sci-Fi",
      year: 2010,
      rating: 9,
      watched: true,
    },
    {
      id: 2,
      title: "Interstellar",
      poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      genre: "Sci-Fi",
      year: 2014,
      rating: 10,
      watched: false,
    },
    {
      id: 3,
      title: "The Dark Knight",
      poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      genre: "Action",
      year: 2008,
      rating: 9,
      watched: true,
    },
  ]);

  const [filter, setFilter] = useState("all");

  const handleToggleWatched = (id) => {
    setMovies(
      movies.map((movie) =>
        movie.id === id
          ? { ...movie, watched: !movie.watched }
          : movie
      )
    );
  };

  const handleDeleteMovie = (id) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  const handleAddMovie = (newMovie) => {
    setMovies([...movies, newMovie]);
  };

  const visibleMovies = movies.filter((movie) => {
    if (filter === "watched") return movie.watched;
    if (filter === "unwatched") return !movie.watched;
    return true;
  });

  return (
    <div className="container">
      <Header />
      <SummaryBar movies={movies} />
      <Greeting />
      <Button />

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