
function TVShowRow(props) {

  return (
    <section>

      {/* =========================
          TV SHOWS TITLE
          ========================= */}

      <h2>
        TV Shows
      </h2>


      {/* =========================
          TV SHOW CONTAINER
          ========================= */}

      <div className="movie-container">

        {props.shows.map((show) => (

          <div
            className="movie-card"
            key={show.id}
            onClick={() => props.onShowClick(show)}
          >

            {/* =========================
                TV SHOW IMAGE
                ========================= */}

            <div className="movie-image-container">

              <img
                src={show.image}
                alt={show.title}
              />


              {/* =========================
                  HOVER OVERLAY
                  ========================= */}

              <div className="movie-overlay">

                <button
                  className="play-button"
                  onClick={(event) => event.stopPropagation()}
                >
                  ▶
                </button>

              </div>

            </div>


            {/* =========================
                TV SHOW TITLE
                ========================= */}

            <h3>
              {show.title}
            </h3>


            {/* =========================
                TV SHOW INFORMATION
                ========================= */}

            <div className="movie-info">

              <span>
                ⭐ {show.rating}
              </span>

              <span>
                TV
              </span>

            </div>

          </div>

        ))}

      </div>

    </section>
  )
}


export default TVShowRow
