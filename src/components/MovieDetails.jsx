import { useEffect, useState } from "react"

import { getMovieDetails } from "../services/movieApi"


function MovieDetails(props) {

  const movie = props.movie

  console.log("SELECTED MOVIE:", movie)
  console.log("RELEASE DATE FROM MOVIE:", movie.releaseDate)


  // =========================
  // STATES
  // =========================

  const [details, setDetails] =
    useState(movie)

  const [loading, setLoading] =
    useState(true)


  // =========================
  // GET FULL MOVIE DETAILS
  // =========================

  useEffect(() => {

    async function loadDetails() {

      try {

        setLoading(true)

        const movieDetails =
          await getMovieDetails(movie.id)

        console.log(
          "FULL MOVIE DETAILS:",
          movieDetails
        )

        console.log(
          "RELEASE DATE FROM API:",
          movieDetails.releaseDate
        )

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
  // FORMAT RUNTIME
  // =========================

  function formatRuntime(minutes) {

    if (!minutes) {
      return null
    }

    const hours =
      Math.floor(minutes / 60)

    const remainingMinutes =
      minutes % 60


    if (hours === 0) {

      return `${remainingMinutes}m`

    }


    if (remainingMinutes === 0) {

      return `${hours}h`

    }


    return `${hours}h ${remainingMinutes}m`

  }


  // =========================
  // FORMAT RELEASE DATE
  // =========================

  function formatDate(date) {

    if (!date) {

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
            MOVIE POSTER
        ========================= */}

        <div className="details-poster">

          <img
            src={details.image}
            alt={details.title}
          />

        </div>


        {/* =========================
            MOVIE INFORMATION
        ========================= */}

        <div className="details-info">


          {/* TITLE */}

          <h1>
            {details.title}
          </h1>


          {/* RATING + YEAR + RUNTIME */}

          <p className="details-rating">

            ⭐ {details.rating}

            <span>
              {" • "}
            </span>

            {details.year}


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


          {/* =========================
              RELEASE DATE
          ========================= */}

          <p className="release-date">

            Release Date:{" "}

            {loading
              ? "Loading..."
              : formatDate(
                  details.releaseDate
                )}

          </p>


          {/* =========================
              LOADING MESSAGE
          ========================= */}

          {loading && (

            <p>
              Loading movie details...
            </p>

          )}


          {/* =========================
              GENRES
          ========================= */}

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


          {/* =========================
              DESCRIPTION
          ========================= */}

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


export default MovieDetails