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
      title: title.trim(),
      poster: poster.trim(),
      genre: genre.trim(),
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
    <form className="add-movie-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Movie Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        type="url"
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
        min="1888"
        max="2100"
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
        onChange={(e) => setRating(Number(e.target.value))}
      />

      <button type="submit">
        Add Movie
      </button>
    </form>
  );
}

export default AddMovieForm;