function SearchResults({ results, onAdd }) {
  if (!results.length) {
    return null;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {results.map((movie) => (
        <div key={movie.id} className="card bg-base-200 shadow-md">
          <figure>
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
                  : "https://placehold.co/342x513?text=No+Poster"
              }
              alt={movie.title}
              className="w-full h-80 object-cover"
            />
          </figure>

          <div className="card-body">
            <h2 className="card-title">{movie.title}</h2>

            <p>
              Year:{" "}
              {movie.release_date
                ? movie.release_date.slice(0, 4)
                : "Unknown"}
            </p>

            <p>
              Rating:{" "}
              {movie.vote_average
                ? movie.vote_average.toFixed(1)
                : "N/A"}
            </p>

            <div className="card-actions justify-end">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => onAdd(movie)}
              >
                Add to Watchlist
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SearchResults;