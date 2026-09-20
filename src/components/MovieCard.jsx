function MovieCard(props) {

  console.log(
    "MOVIE CARD DATA:",
    props.movie
  )


  return (

    <div
      className="movie-card"
      onClick={() =>
        props.onMovieClick(
          props.movie
        )
      }
    >

      {/* MOVIE IMAGE */}

      <div className="movie-image-container">

        <img
          src={props.movie.image}
          alt={props.movie.title}
        />


        {/* HOVER OVERLAY */}

        <div className="movie-overlay">

          <button
            className="play-button"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            ▶
          </button>

        </div>

      </div>


      {/* MOVIE TITLE */}

      <h3>
        {props.movie.title}
      </h3>


      {/* MOVIE INFORMATION */}

      <div className="movie-info">

        <span>
          ⭐ {props.movie.rating}
        </span>


        <span>
          HD
        </span>

      </div>

    </div>

  )
}


export default MovieCard