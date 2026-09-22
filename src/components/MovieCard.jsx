function MovieCard(props) {
  const imageUrl = props.movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${props.movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image"

  function handlePlay(event) {
    event.stopPropagation()

    if (props.onWatchNow) {
      props.onWatchNow(props.movie)
    }
  }

  return (
    <div
      className="movie-card"
      onClick={() => props.onMovieClick(props.movie)}
    >
      <div className="movie-image-container">

        <img
          src={imageUrl}
          alt={props.movie.title}
        />

        <div className="movie-overlay">

          <button
            className="play-button"
            onClick={handlePlay}
          >
            ▶
          </button>

        </div>
      </div>

      <h3>{props.movie.title}</h3>

      <div className="movie-info">

        <span>
          ⭐{" "}
          {props.movie.vote_average
            ? props.movie.vote_average.toFixed(1)
            : "N/A"}
        </span>

        <span>HD</span>

      </div>
    </div>
  )
}

export default MovieCard