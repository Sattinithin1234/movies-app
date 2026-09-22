function TVShowRow(props) {
  return (
    <section>
      {/* TV SHOWS TITLE */}
      <h2>
        TV Shows
      </h2>

      {/* TV SHOW CONTAINER */}
      <div className="movie-container">

        {props.shows.map((show) => {

          const imageUrl = show.poster_path
            ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
            : "https://via.placeholder.com/500x750?text=No+Image"

          return (
            <div
              className="movie-card"
              key={show.id}
              onClick={() => props.onShowClick(show)}
            >

              {/* TV SHOW IMAGE */}
              <div className="movie-image-container">

                <img
                  src={imageUrl}
                  alt={show.name}
                />

                {/* HOVER OVERLAY */}
                <div className="movie-overlay">

                  <button
                    className="play-button"
                    onClick={(event) => event.stopPropagation()}
                  >
                    ▶
                  </button>

                </div>

              </div>

              {/* TV SHOW TITLE */}
              <h3>
                {show.name}
              </h3>

              {/* TV SHOW INFORMATION */}
              <div className="movie-info">

                <span>
                  ⭐ {show.vote_average?.toFixed(1) || "N/A"}
                </span>

                <span>
                  TV
                </span>

              </div>

            </div>
          )
        })}

      </div>
    </section>
  )
}

export default TVShowRow