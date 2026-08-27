function SummaryBar({ movies }) {
  const total = movies.length;
  const watched = movies.filter((movie) => movie.watched).length;
  const unwatched = movies.filter((movie) => !movie.watched).length;

  return (
    <div className="summary-bar">
      <span>Total: {total}</span>
      <span>Watched: {watched}</span>
      <span>Unwatched: {unwatched}</span>
    </div>
  );
}

export default SummaryBar;