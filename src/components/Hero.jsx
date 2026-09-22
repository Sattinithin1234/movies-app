function Hero(props) {
  const movie = props.movie

  if (!movie) {
    return null
  }

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : movie.poster_path
      ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
      : ""

  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A"

  function handleWatchNow() {
    props.onWatchNow(movie)
  }

  function handleMyList() {
    if (props.isInMyList) {
      props.onRemoveFromMyList(movie.id)
    } else {
      props.onAddToMyList(movie)
    }
  }

  function formatRuntime(minutes) {
    if (!minutes) {
      return null
    }

    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60

    if (hours === 0) {
      return `${remainingMinutes}m`
    }

    if (remainingMinutes === 0) {
      return `${hours}h`
    }

    return `${hours}h ${remainingMinutes}m`
  }

  return (
    <section
      className="hero"
      style={{
        backgroundImage: `
          linear-gradient(
            to right,
            rgba(0, 0, 0, 0.95) 0%,
            rgba(0, 0, 0, 0.75) 45%,
            rgba(0, 0, 0, 0.25) 100%
          ),
          url(${backdropUrl})
        `
      }}
    >
      <div className="hero-content">

        <h1>{movie.title}</h1>

        <div className="hero-meta">
          <span>
            ⭐{" "}
            {movie.vote_average
              ? movie.vote_average.toFixed(1)
              : "N/A"}
          </span>

          <span>{year}</span>

          {movie.runtime && (
            <span>
              {formatRuntime(movie.runtime)}
            </span>
          )}
        </div>

        <p>
          {movie.overview ||
            "No description available."}
        </p>

        <div className="hero-buttons">

          <button
            className="hero-watch-button"
            onClick={handleWatchNow}
          >
            ▶ Watch Now
          </button>

          <button
            className="hero-list-button"
            onClick={handleMyList}
          >
            {props.isInMyList
              ? "✓ Added to My List"
              : "+ My List"}
          </button>

        </div>

      </div>
    </section>
  )
}

export default Hero