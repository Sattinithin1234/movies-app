import MovieCard from "./MovieCard"


function MovieRow(props) {

  return (
    <section id={props.id}>

      {/* =========================
          ROW TITLE
          ========================= */}

      <h2>
        {props.title}
      </h2>


      {/* =========================
          MOVIE CONTAINER
          ========================= */}

      <div className="movie-container">

        {props.movies.map((movie) => (

          <MovieCard
            key={movie.id}
            movie={movie}
            onMovieClick={props.onMovieClick}
          />

        ))}

      </div>

    </section>
  )
}


export default MovieRow