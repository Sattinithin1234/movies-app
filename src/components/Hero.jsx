function Hero(props) {

  const movie = props.movie


  /* =========================
     NO MOVIE
     ========================= */

  if (!movie) {
    return null
  }


  /* =========================
     WATCH NOW
     ========================= */

  function handleWatchNow() {

    const searchQuery =
      `${movie.title} official trailer`

    const youtubeUrl =
      `https://www.youtube.com/results?search_query=${encodeURIComponent(
        searchQuery
      )}`

    window.open(
      youtubeUrl,
      "_blank"
    )

  }


  /* =========================
     MY LIST
     ========================= */

  function handleMyList() {

    if (props.isInMyList) {

      props.onRemoveFromMyList(
        movie.id
      )

    } else {

      props.onAddToMyList(
        movie
      )

    }

  }


  /* =========================
     RUNTIME
     ========================= */

  function formatRuntime(minutes) {

    if (!minutes) {
      return null
    }


    const hours =
      Math.floor(
        minutes / 60
      )

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


  return (

    <section
      className="hero"
      style={{
        backgroundImage:
          `url(${movie.backdrop || movie.image})`
      }}
    >

      {/* =========================
          HERO CONTENT
          ========================= */}

      <div className="hero-content">


        {/* TITLE */}

        <h1>
          {movie.title}
        </h1>


        {/* MOVIE INFORMATION */}

        <p>

          ⭐ {movie.rating}

          {" • "}

          {movie.year}


          {movie.runtime && (

            <>
              {" • "}

              {formatRuntime(
                movie.runtime
              )}
            </>

          )}

        </p>


        {/* DESCRIPTION */}

        <p>
          {movie.description}
        </p>


        {/* BUTTONS */}

        <div className="hero-buttons">


          {/* WATCH NOW */}

          <button
            className="watch-button"
            onClick={
              handleWatchNow
            }
          >
            ▶ Watch Now
          </button>


          {/* MY LIST */}

          <button
            className="list-button"
            onClick={
              handleMyList
            }
          >

            {props.isInMyList
              ? "✓ Added"
              : "+ My List"}

          </button>


        </div>

      </div>

    </section>

  )

}


export default Hero