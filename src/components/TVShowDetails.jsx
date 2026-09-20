import { useEffect, useState } from "react"

import { getTVShowDetails } from "../services/movieApi"


function TVShowDetails(props) {

  const show = props.show

  console.log("SELECTED TV SHOW:", show)


  // =========================
  // STATES
  // =========================

  const [details, setDetails] =
    useState(show)

  const [loading, setLoading] =
    useState(true)


  // =========================
  // GET FULL TV SHOW DETAILS
  // =========================

  useEffect(() => {

    async function loadDetails() {

      try {

        setLoading(true)

        const showDetails =
          await getTVShowDetails(show.id)

        console.log(
          "FULL TV SHOW DETAILS:",
          showDetails
        )

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


  // =========================
  // WATCH NOW
  // =========================

  function handleWatchNow() {

    const searchQuery =
      `${details.title} official trailer`

    const youtubeUrl =
      `https://www.youtube.com/results?search_query=${encodeURIComponent(
        searchQuery
      )}`

    window.open(
      youtubeUrl,
      "_blank"
    )
  }


  // =========================
  // MY LIST
  // =========================

  function handleMyList() {

    if (props.isInMyList) {

      props.onRemoveFromMyList(
        details.id
      )

    } else {

      props.onAddToMyList(
        details
      )

    }

  }


  // =========================
  // FORMAT DATE
  // =========================

  function formatDate(date) {

    if (!date || date === "N/A") {

      return "Not available"

    }

    return new Date(
      date
    ).toLocaleDateString(
      "en-US",
      {
        month: "long",
        day: "numeric",
        year: "numeric"
      }
    )

  }


  return (

    <div className="movie-details">

      <div className="details-content">


        {/* =========================
            TV SHOW POSTER
        ========================= */}

        <div className="details-poster">

          <img
            src={details.image}
            alt={details.title}
          />

        </div>


        {/* =========================
            TV SHOW INFORMATION
        ========================= */}

        <div className="details-info">


          {/* TITLE */}

          <h1>
            {details.title}
          </h1>


          {/* RATING */}

          <p className="details-rating">

            ⭐ {details.rating}

          </p>


          {/* FIRST AIR DATE */}

          <p className="release-date">

            First Air Date:{" "}

            {loading
              ? "Loading..."
              : formatDate(
                  details.firstAirDate
                )}

          </p>


          {/* SEASONS + EPISODES */}

          {!loading && (

            <p className="tv-stats">

              📺 {details.seasons || 0} Seasons

              <span>
                {" • "}
              </span>

              🎞️ {details.episodes || 0} Episodes

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
                    key={genre}
                  >
                    {genre}
                  </span>

                )
              )}

            </div>

          )}


          {/* DESCRIPTION */}

          <p>
            {details.description}
          </p>


          {/* =========================
              BUTTONS
          ========================= */}

          <div className="details-buttons">


            {/* WATCH NOW */}

            <button
              className="watch-button"
              onClick={handleWatchNow}
            >

              ▶ Watch Now

            </button>


            {/* MY LIST */}

            <button
              className="list-button"
              onClick={handleMyList}
            >

              {props.isInMyList
                ? "✓ Added"
                : "+ My List"}

            </button>


            {/* CLOSE */}

            <button
              className="close-button"
              onClick={
                props.onClose
              }
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

