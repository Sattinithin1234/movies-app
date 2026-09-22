import { useEffect, useState } from "react"
import { getMovieDetails } from "../services/movieApi"

function MovieDetails(props) {
  const movie = props.movie

  const [details, setDetails] = useState(movie)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadDetails() {
      try {
        setLoading(true)

        const movieDetails =
          await getMovieDetails(movie.id)

        setDetails({
          ...movie,
          ...movieDetails
        })

      } catch (error) {
        console.error(
          "Movie Details Error:",
          error
        )

        setDetails(movie)

      } finally {
        setLoading(false)
      }
    }

    loadDetails()
  }, [movie])

  function handleWatchNow() {
    props.onWatchNow(details)
  }

  function handleMyList() {
    if (props.isInMyList) {
      props.onRemoveFromMyList(details.id)
    } else {
      props.onAddToMyList(details)
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

  function formatDate(date) {
    if (!date) {
      return "Not available"
    }

    return new Date(date).toLocaleDateString(
      "en-US",
      {
        month: "long",
        day: "numeric",
        year: "numeric"
      }
    )
  }

  const posterUrl =
    details.poster_path
      ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
      : ""

  const year =
    details.release_date
      ? new Date(
          details.release_date
        ).getFullYear()
      : "N/A"

  return (
    <div className="movie-details">

      {/* BACK BUTTON */}

      <button
        className="details-back-button"
        onClick={props.onClose}
      >
        ← Back
      </button>

      <div className="details-content">

        {/* POSTER */}

        <div className="details-poster">

          {posterUrl ? (
            <img
              src={posterUrl}
              alt={details.title}
            />
          ) : (
            <div className="no-poster">
              No Image
            </div>
          )}

        </div>

        {/* DETAILS */}

        <div className="details-info">

          <h1>
            {details.title}
          </h1>

          {/* RATING / YEAR / RUNTIME */}

          <p className="details-rating">

            ⭐{" "}
            {details.vote_average
              ? details.vote_average.toFixed(1)
              : "N/A"}

            <span>
              {" • "}
            </span>

            {year}

            {details.runtime && (
              <>
                <span>
                  {" • "}
                </span>

                {formatRuntime(
                  details.runtime
                )}
              </>
            )}

          </p>

          {/* RELEASE DATE */}

          <p className="release-date">

            Release Date:{" "}

            {loading
              ? "Loading..."
              : formatDate(
                  details.release_date
                )}

          </p>

          {/* LOADING */}

          {loading && (
            <p>
              Loading movie details...
            </p>
          )}

          {/* GENRES */}

          {!loading &&
            details.genres &&
            details.genres.length > 0 && (

              <div className="movie-genres">

                {details.genres.map(
                  (genre) => (

                    <span
                      className="genre-tag"
                      key={genre.id}
                    >
                      {genre.name}
                    </span>

                  )
                )}

              </div>

            )}

          {/* DESCRIPTION */}

          <p>
            {details.overview ||
              "No description available."}
          </p>

          {/* BUTTONS */}

          <div className="details-buttons">

            <button
              className="watch-button"
              onClick={handleWatchNow}
            >
              ▶ Watch Now
            </button>

            <button
              className="list-button"
              onClick={handleMyList}
            >
              {props.isInMyList
                ? "✓ Added"
                : "+ My List"}
            </button>

            <button
              className="close-button"
              onClick={props.onClose}
            >
              ✕ Close
            </button>

          </div>

        </div>

      </div>

    </div>
  )
}

export default MovieDetails