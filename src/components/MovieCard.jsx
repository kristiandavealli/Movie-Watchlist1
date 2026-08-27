function MovieCard({ movie, onToggleWatched, onDelete }) {
  const { id, title, poster, genre, year, rating, watched } = movie;

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={poster} alt={title} />
      </div>

      <div className="movie-info">
        <h2>{title}</h2>

        <div className="movie-meta">
          <span>{genre}</span>
          <span>{year}</span>
        </div>

        <div className="movie-rating">
          ⭐ {rating}/10
        </div>

        <div className="card-actions">
          <button
            className={watched ? "watched-btn" : "unwatched-btn"}
            onClick={() => onToggleWatched(id)}
          >
            {watched ? "Watched" : "Unwatched"}
          </button>

          <button
            className="delete-btn"
            onClick={() => onDelete(id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;