import { useEffect, useState } from "react"
import { getTVShowDetails } from "../services/movieApi"

function TVShowDetails(props) {
  const show = props.show

  const [details, setDetails] = useState(show)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadDetails() {
      try {
        setLoading(true)

        const showDetails =
          await getTVShowDetails(show.id)

        setDetails({
          ...show,
          ...showDetails
        })
      } catch (error) {
        console.error(
          "TV Show Details Error:",
          error
        )

        setDetails(show)
      } finally {
        setLoading(false)
      }
    }

    loadDetails()
  }, [show])

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
              alt={details.name}
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
            {details.name}
          </h1>

          {/* RATING */}

          <p className="details-rating">

            ⭐{" "}
            {details.vote_average
              ? details.vote_average.toFixed(1)
              : "N/A"}

          </p>

          {/* FIRST AIR DATE */}

          <p className="release-date">

            First Air Date:{" "}

            {loading
              ? "Loading..."
              : formatDate(
                  details.first_air_date
                )}

          </p>

          {/* TV STATS */}

          {!loading && (
            <p className="tv-stats">

              📺{" "}
              {details.number_of_seasons || 0}
              {" "}Seasons

              <span>
                {" • "}
              </span>

              🎞️{" "}
              {details.number_of_episodes || 0}
              {" "}Episodes

            </p>
          )}

          {/* LOADING */}

          {loading && (
            <p>
              Loading TV show details...
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

export default TVShowDetails