const BASE_URL = "https://api.themoviedb.org/3"

const API_KEY = import.meta.env.VITE_TMDB_API_KEY


async function getData(url) {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error("API request failed")
  }

  const data = await response.json()

  return data.results || []
}


/* Trending Movies */

export async function getTrendingMovies() {
  return getData(
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
  )
}


/* Popular Movies */

export async function getPopularMovies() {
  return getData(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}`
  )
}


/* Top Rated Movies */

export async function getTopRatedMovies() {
  return getData(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`
  )
}


/* Popular TV Shows */

export async function getPopularTVShows() {
  return getData(
    `${BASE_URL}/tv/popular?api_key=${API_KEY}`
  )
}


/* Search Movies + TV Shows */

export async function searchMulti(query) {

  if (!query || !query.trim()) {
    return []
  }

  const url =
    `${BASE_URL}/search/multi` +
    `?api_key=${API_KEY}` +
    `&query=${encodeURIComponent(query)}`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error("Search request failed")
  }

  const data = await response.json()

  return data.results || []
}


/* Movie Details */

export async function getMovieDetails(movieId) {

  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
  )

  if (!response.ok) {
    throw new Error("Failed to get movie details")
  }

  return await response.json()
}


/* TV Show Details */

export async function getTVShowDetails(showId) {

  const response = await fetch(
    `${BASE_URL}/tv/${showId}?api_key=${API_KEY}`
  )

  if (!response.ok) {
    throw new Error("Failed to get TV show details")
  }

  return await response.json()
}
export async function getMovieVideos(movieId) {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
  )

  if (!response.ok) {
    throw new Error("Failed to get movie videos")
  }

  const data = await response.json()

  return data.results || []
}
export async function getTVShowVideos(showId) {
  const response = await fetch(
    `${BASE_URL}/tv/${showId}/videos?api_key=${API_KEY}`
  )

  if (!response.ok) {
    throw new Error("Failed to get TV show videos")
  }

  const data = await response.json()

  return data.results || []
}