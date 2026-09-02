import { getPosterUrl } from "../api/tmdb";

const SearchResults = ({ results, onAdd, isLoading, error }) => {
  if (isLoading) return <p>Loading movies...</p>;

  if (error) return <p className="text-error">{error}</p>;

  if (results.length === 0) return null;

  return (
    <div className="my-6">
      <h2 className="text-2xl font-bold mb-4">Search Results</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {results.map((movie) => (
          <div key={movie.id} className="card bg-base-200 shadow-md">
            <figure>
              <img
                src={getPosterUrl(movie.poster_path)}
                alt={movie.title}
                className="w-full h-80 object-cover"
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title">{movie.title}</h2>

              <p>
                {movie.release_date?.slice(0, 4) || "N/A"} • ⭐{" "}
                {movie.vote_average?.toFixed(1) || "—"}
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
    </div>
  );
};

export default SearchResults;