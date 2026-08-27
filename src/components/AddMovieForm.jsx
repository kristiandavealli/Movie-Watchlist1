import { useState } from "react";

function AddMovieForm({ onAddMovie }) {
  const [title, setTitle] = useState("");
  const [poster, setPoster] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddMovie({
      id: Date.now(),
      title,
      poster,
      genre,
      year: Number(year),
      rating: Number(rating),
      watched: false,
    });

    setTitle("");
    setPoster("");
    setGenre("");
    setYear("");
    setRating(5);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Movie title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Poster URL"
        value={poster}
        onChange={(e) => setPoster(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        required
      />

      <label>
        Rating: {rating}/10
      </label>

      <input
        type="range"
        min="1"
        max="10"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />

      <button type="submit" className="btn btn-primary">
        Add Movie
      </button>
    </form>
  );
}

export default AddMovieForm;