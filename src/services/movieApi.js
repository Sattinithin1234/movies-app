/* =========================
   TMDB API CONFIGURATION
   ========================= */

const API_KEY =
  import.meta.env.VITE_TMDB_API_KEY

const BASE_URL =
  "https://api.themoviedb.org/3"


/* =========================
   GENRE DATA
   ========================= */

const movieGenres = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western"
}


const tvGenres = {
  10759: "Action & Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  10762: "Kids",
  9648: "Mystery",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10766: "Soap",
  10767: "Talk",
  10768: "War & Politics",
  37: "Western"
}


/* =========================
   GET GENRE NAMES
   ========================= */

function getGenreNames(
  genreIds,
  type = "movie"
) {

  const genres =
    type === "tv"
      ? tvGenres
      : movieGenres


  return genreIds
    .map(
      (id) => genres[id]
    )
    .filter(Boolean)

}


/* =========================
   FORMAT MOVIE
   ========================= */

function formatMovie(movie) {

  return {

    id: movie.id,

    title:
      movie.title ||
      movie.name ||
      "Untitled",

    rating:
      movie.vote_average
        ? Number(
            movie.vote_average.toFixed(1)
          )
        : "N/A",

    year:
      movie.release_date
        ? movie.release_date.slice(0, 4)
        : "N/A",

    releaseDate:
      movie.release_date
        ? movie.release_date
        : "N/A",

    runtime:
      movie.runtime || null,

    description:
      movie.overview
        ? movie.overview
        : "No description available.",

    genres:
      getGenreNames(
        movie.genre_ids || [],
        "movie"
      ),

    image:
      movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "",

    /* HERO BACKDROP */

    backdrop:
      movie.backdrop_path
        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        : "",

    type: "movie"

  }

}


/* =========================
   FORMAT MOVIE DETAILS
   ========================= */

function formatMovieDetails(movie) {

  return {

    id: movie.id,

    title:
      movie.title ||
      "Untitled",

    rating:
      movie.vote_average
        ? Number(
            movie.vote_average.toFixed(1)
          )
        : "N/A",

    year:
      movie.release_date
        ? movie.release_date.slice(0, 4)
        : "N/A",

    releaseDate:
      movie.release_date
        ? movie.release_date
        : "N/A",

    runtime:
      movie.runtime || null,

    description:
      movie.overview
        ? movie.overview
        : "No description available.",

    genres:
      (movie.genres || [])
        .map(
          (genre) =>
            genre.name
        ),

    image:
      movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "",

    backdrop:
      movie.backdrop_path
        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        : "",

    type: "movie"

  }

}


/* =========================
   GET MOVIE DETAILS
   ========================= */

export async function getMovieDetails(
  id
) {

  const url =
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}`


  const response =
    await fetch(url)


  const data =
    await response.json()


  console.log(
    "MOVIE DETAILS RESPONSE:",
    data
  )


  if (!response.ok) {

    throw new Error(
      data.status_message ||
      "Failed to fetch movie details"
    )

  }


  return formatMovieDetails(
    data
  )

}


/* =========================
   TRENDING MOVIES
   ========================= */

export async function getTrendingMovies() {

  const url =
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`


  const response =
    await fetch(url)


  const data =
    await response.json()


  if (!response.ok) {

    throw new Error(
      data.status_message ||
      "Failed to fetch trending movies"
    )

  }


  return (
    data.results || []
  )
    .map(formatMovie)

}


/* =========================
   POPULAR MOVIES
   ========================= */

export async function getPopularMovies() {

  const url =
    `${BASE_URL}/movie/popular?api_key=${API_KEY}`


  const response =
    await fetch(url)


  const data =
    await response.json()


  if (!response.ok) {

    throw new Error(
      data.status_message ||
      "Failed to fetch popular movies"
    )

  }


  return (
    data.results || []
  )
    .map(formatMovie)

}


/* =========================
   TOP RATED MOVIES
   ========================= */

export async function getTopRatedMovies() {

  const url =
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`


  const response =
    await fetch(url)


  const data =
    await response.json()


  if (!response.ok) {

    throw new Error(
      data.status_message ||
      "Failed to fetch top rated movies"
    )

  }


  return (
    data.results || []
  )
    .map(formatMovie)

}


/* =========================
   POPULAR TV SHOWS
   ========================= */

export async function getPopularTVShows() {

  const url =
    `${BASE_URL}/tv/popular?api_key=${API_KEY}`


  const response =
    await fetch(url)


  const data =
    await response.json()


  if (!response.ok) {

    throw new Error(
      data.status_message ||
      "Failed to fetch popular TV shows"
    )

  }


  return (
    data.results || []
  )
    .map((show) => ({

      id: show.id,

      title:
        show.name ||
        "Untitled",

      rating:
        show.vote_average
          ? Number(
              show.vote_average.toFixed(1)
            )
          : "N/A",

      year:
        show.first_air_date
          ? show.first_air_date.slice(0, 4)
          : "N/A",

      firstAirDate:
        show.first_air_date
          ? show.first_air_date
          : "N/A",

      description:
        show.overview
          ? show.overview
          : "No description available.",

      genres:
        getGenreNames(
          show.genre_ids || [],
          "tv"
        ),

      image:
        show.poster_path
          ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
          : "",

      backdrop:
        show.backdrop_path
          ? `https://image.tmdb.org/t/p/original${show.backdrop_path}`
          : "",

      type: "tv"

    }))

}


/* =========================
   SEARCH MOVIES + TV SHOWS
   ========================= */

export async function searchMulti(
  query
) {

  if (!query.trim()) {

    return []

  }


  const url =
    `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}`


  const response =
    await fetch(url)


  const data =
    await response.json()


  if (!response.ok) {

    throw new Error(
      data.status_message ||
      "Search failed"
    )

  }


  return (
    data.results || []
  )

    .filter(
      (item) =>
        item.media_type === "movie" ||
        item.media_type === "tv"
    )

    .map((item) => {

      if (
        item.media_type === "movie"
      ) {

        return formatMovie(
          item
        )

      }


      return {

        id: item.id,

        title:
          item.name ||
          "Untitled",

        rating:
          item.vote_average
            ? Number(
                item.vote_average.toFixed(1)
              )
            : "N/A",

        year:
          item.first_air_date
            ? item.first_air_date.slice(0, 4)
            : "N/A",

        firstAirDate:
          item.first_air_date
            ? item.first_air_date
            : "N/A",

        description:
          item.overview
            ? item.overview
            : "No description available.",

        genres:
          getGenreNames(
            item.genre_ids || [],
            "tv"
          ),

        image:
          item.poster_path
            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
            : "",

        backdrop:
          item.backdrop_path
            ? `https://image.tmdb.org/t/p/original${item.backdrop_path}`
            : "",

        type: "tv"

      }

    })

}


/* =========================
   TV SHOW DETAILS
   ========================= */

export async function getTVShowDetails(
  id
) {

  const url =
    `${BASE_URL}/tv/${id}?api_key=${API_KEY}`


  const response =
    await fetch(url)


  const data =
    await response.json()


  console.log(
    "TV SHOW DETAILS RESPONSE:",
    data
  )


  if (!response.ok) {

    throw new Error(
      data.status_message ||
      "Failed to fetch TV show details"
    )

  }


  return {

    id:
      data.id,

    title:
      data.name ||
      "Untitled",

    rating:
      data.vote_average
        ? Number(
            data.vote_average.toFixed(1)
          )
        : "N/A",

    firstAirDate:
      data.first_air_date
        ? data.first_air_date
        : "N/A",

    seasons:
      data.number_of_seasons || 0,

    episodes:
      data.number_of_episodes || 0,

    description:
      data.overview
        ? data.overview
        : "No description available.",

    genres:
      (data.genres || [])
        .map(
          (genre) =>
            genre.name
        ),

    image:
      data.poster_path
        ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
        : "",

    backdrop:
      data.backdrop_path
        ? `https://image.tmdb.org/t/p/original${data.backdrop_path}`
        : "",

    type: "tv"

  }

}