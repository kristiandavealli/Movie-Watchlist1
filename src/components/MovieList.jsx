import MovieCard from "./MovieCard";

function MovieList({ movies, onToggleWatched, onDelete }) {
  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onToggleWatched={onToggleWatched}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default MovieList;