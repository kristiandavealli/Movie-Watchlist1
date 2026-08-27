function MovieCard({ movie, onToggleWatched, onDelete }) {
  const { id, title, poster, genre, year, rating, watched } = movie;

  return (
    <div className="movie-card">
      <img src={poster} alt={title} />

      <h2>{title}</h2>
      <p>{genre} - {year}</p>
      <p>Rating: {rating}/10</p>

      <div className="card-actions">
        <button onClick={() => onToggleWatched(id)}>
          {watched ? "Watched" : "Unwatched"}
        </button>

        <button onClick={() => onDelete(id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default MovieCard;