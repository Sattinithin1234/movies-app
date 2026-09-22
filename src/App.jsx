import { useEffect, useState } from "react"
import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom"

import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import MovieRow from "./components/MovieRow"
import TVShowRow from "./components/TVShowRow"
import MovieDetails from "./components/MovieDetails"
import TVShowDetails from "./components/TVShowDetails"
import TrailerModal from "./components/TrailerModal"

import Login from "./components/Login/Login"
import Signup from "./components/Signup/Signup"
import Account from "./components/Account/Account"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"

import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getPopularTVShows,
  searchMulti,
  getMovieVideos,
  getTVShowVideos
} from "./services/movieApi"

import "./App.css"


/* =========================================================
   MOVIES APP
   ========================================================= */

function MoviesApp() {

  const [trendingMovies, setTrendingMovies] = useState([])
  const [popularMovies, setPopularMovies] = useState([])
  const [topRatedMovies, setTopRatedMovies] = useState([])
  const [tvShows, setTvShows] = useState([])

  const [searchText, setSearchText] = useState("")
  const [searchResults, setSearchResults] = useState([])

  const [selectedMovie, setSelectedMovie] = useState(null)
  const [selectedShow, setSelectedShow] = useState(null)

  const [myList, setMyList] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const [trailerKey, setTrailerKey] = useState("")


  /* =========================================================
     LOAD MOVIES AND TV SHOWS
     ========================================================= */

  useEffect(() => {

    async function loadMovies() {

      try {

        setLoading(true)
        setError("")

        const [
          trending,
          popular,
          topRated,
          tv
        ] = await Promise.all([
          getTrendingMovies(),
          getPopularMovies(),
          getTopRatedMovies(),
          getPopularTVShows()
        ])

        setTrendingMovies(trending || [])
        setPopularMovies(popular || [])
        setTopRatedMovies(topRated || [])
        setTvShows(tv || [])

      } catch (error) {

        console.error(
          "Movie API Error:",
          error
        )

        setError(
          "Something went wrong while loading movies."
        )

      } finally {

        setLoading(false)

      }
    }

    loadMovies()

  }, [])


  /* =========================================================
     LOAD MY LIST
     ========================================================= */

  useEffect(() => {

    const savedList =
      localStorage.getItem("myList")

    if (savedList) {

      try {

        setMyList(
          JSON.parse(savedList)
        )

      } catch (error) {

        console.error(
          "My List Error:",
          error
        )

        setMyList([])

      }
    }

  }, [])


  /* =========================================================
     SEARCH
     ========================================================= */

  useEffect(() => {

    if (!searchText.trim()) {

      setSearchResults([])

      return

    }

    const timer = setTimeout(
      async () => {

        try {

          const results =
            await searchMulti(searchText)

          setSearchResults(
            results || []
          )

        } catch (error) {

          console.error(
            "Search Error:",
            error
          )

          setSearchResults([])

        }

      },
      500
    )

    return () =>
      clearTimeout(timer)

  }, [searchText])


  /* =========================================================
     ADD TO MY LIST
     ========================================================= */

  function addToMyList(item) {

    const alreadyExists =
      myList.some(
        (movie) =>
          movie.id === item.id
      )

    if (alreadyExists) {
      return
    }

    const updatedList = [
      ...myList,
      item
    ]

    setMyList(updatedList)

    localStorage.setItem(
      "myList",
      JSON.stringify(updatedList)
    )
  }


  /* =========================================================
     REMOVE FROM MY LIST
     ========================================================= */

  function removeFromMyList(itemId) {

    const updatedList =
      myList.filter(
        (item) =>
          item.id !== itemId
      )

    setMyList(updatedList)

    localStorage.setItem(
      "myList",
      JSON.stringify(updatedList)
    )
  }


  /* =========================================================
     CHECK MY LIST
     ========================================================= */

  function isInMyList(itemId) {

    return myList.some(
      (item) =>
        item.id === itemId
    )
  }


  /* =========================================================
     WATCH MOVIE TRAILER
     ========================================================= */

  async function handleWatchMovieTrailer(movie) {

    try {

      const videos =
        await getMovieVideos(movie.id)

      const trailer =
        videos.find(
          (video) =>
            video.site === "YouTube" &&
            video.type === "Trailer"
        ) ||
        videos.find(
          (video) =>
            video.site === "YouTube"
        )

      if (trailer) {

        setTrailerKey(
          trailer.key
        )

      } else {

        alert(
          "Trailer not available."
        )

      }

    } catch (error) {

      console.error(
        "Movie Trailer Error:",
        error
      )

      alert(
        "Unable to load trailer."
      )

    }
  }


  /* =========================================================
     WATCH TV SHOW TRAILER
     ========================================================= */

  async function handleWatchTVTrailer(show) {

    try {

      const videos =
        await getTVShowVideos(show.id)

      const trailer =
        videos.find(
          (video) =>
            video.site === "YouTube" &&
            video.type === "Trailer"
        ) ||
        videos.find(
          (video) =>
            video.site === "YouTube"
        )

      if (trailer) {

        setTrailerKey(
          trailer.key
        )

      } else {

        alert(
          "Trailer not available."
        )

      }

    } catch (error) {

      console.error(
        "TV Trailer Error:",
        error
      )

      alert(
        "Unable to load trailer."
      )

    }
  }


  /* =========================================================
     CLOSE TRAILER
     ========================================================= */

  function closeTrailer() {

    setTrailerKey("")

  }


  /* =========================================================
     LOADING
     ========================================================= */

  if (loading) {

    return (
      <div className="loading-container">

        <h2>
          Loading Movies...
        </h2>

      </div>
    )

  }


  /* =========================================================
     ERROR
     ========================================================= */

  if (error) {

    return (
      <div className="error-container">

        <h2>
          {error}
        </h2>

        <button
          onClick={() =>
            window.location.reload()
          }
        >
          Try Again
        </button>

      </div>
    )

  }


  /* =========================================================
     MAIN UI
     ========================================================= */

  return (

    <div className="app">

      {/* =====================================================
          NAVBAR
          ===================================================== */}

      <Navbar
        searchText={searchText}
        setSearchText={setSearchText}
      />


      {/* =====================================================
          SEARCH RESULTS
          ===================================================== */}

      {searchText.trim() ? (

        <section className="search-results-section">

          <h2>
            Search Results
          </h2>


          {searchResults.filter(
            (item) =>
              item.media_type === "movie" ||
              item.media_type === "tv"
          ).length === 0 ? (

            <p className="no-results">
              No movies or TV shows found.
            </p>

          ) : (

            <div className="search-results-grid">

              {searchResults
                .filter(
                  (item) =>
                    item.media_type === "movie" ||
                    item.media_type === "tv"
                )
                .map((item) => (

                  <div
                    className="search-card"
                    key={`${item.media_type}-${item.id}`}
                    onClick={() => {

                      if (
                        item.media_type === "movie"
                      ) {

                        setSelectedMovie(item)

                      } else {

                        setSelectedShow(item)

                      }

                    }}
                  >

                    {item.poster_path ? (

                      <img
                        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                        alt={
                          item.title ||
                          item.name
                        }
                      />

                    ) : (

                      <div className="no-poster">
                        No Image
                      </div>

                    )}

                    <h3>
                      {item.title ||
                        item.name}
                    </h3>

                    <p>
                      {item.media_type === "movie"
                        ? "Movie"
                        : "TV Show"}
                    </p>

                  </div>

                ))}

            </div>

          )}

        </section>

      ) : (

        <>

          {/* =================================================
              HERO
              ================================================= */}

          {trendingMovies.length > 0 && (

            <Hero
              movie={trendingMovies[0]}
              onWatchNow={
                handleWatchMovieTrailer
              }
              onAddToMyList={
                addToMyList
              }
              onRemoveFromMyList={
                removeFromMyList
              }
              isInMyList={
                isInMyList(
                  trendingMovies[0].id
                )
              }
            />

          )}


          {/* =================================================
              TRENDING MOVIES
              ================================================= */}

          <MovieRow
            title="Trending Movies"
            movies={trendingMovies}
            onMovieClick={
              setSelectedMovie
            }
          />


          {/* =================================================
              POPULAR MOVIES
              ================================================= */}

          <MovieRow
            title="Popular Movies"
            movies={popularMovies}
            onMovieClick={
              setSelectedMovie
            }
          />


          {/* =================================================
              TOP RATED MOVIES
              ================================================= */}

          <MovieRow
            title="Top Rated Movies"
            movies={topRatedMovies}
            onMovieClick={
              setSelectedMovie
            }
          />


          {/* =================================================
              TV SHOWS
              ================================================= */}

          <TVShowRow
            title="Popular TV Shows"
            shows={tvShows}
            onShowClick={
              setSelectedShow
            }
          />


          {/* =================================================
              MY LIST
              ================================================= */}

          {myList.length > 0 && (

            <section
              id="my-list-section"
              className="movie-section"
            >

              <h2>
                My List
              </h2>

              <div className="my-list-grid">

                {myList.map((item) => {

                  const isTV =
                    item.name &&
                    !item.title

                  const imageUrl =
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                      : ""

                  return (

                    <div
                      className="my-list-card"
                      key={`${isTV ? "tv" : "movie"}-${item.id}`}
                      onClick={() => {

                        if (isTV) {

                          setSelectedShow(item)

                        } else {

                          setSelectedMovie(item)

                        }

                      }}
                    >

                      {imageUrl ? (

                        <img
                          src={imageUrl}
                          alt={
                            item.title ||
                            item.name
                          }
                        />

                      ) : (

                        <div className="no-poster">
                          No Image
                        </div>

                      )}

                      <div className="my-list-info">

                        <h3>
                          {item.title ||
                            item.name}
                        </h3>

                        <div className="my-list-meta">

                          <span>
                            ⭐{" "}
                            {item.vote_average
                              ? item.vote_average.toFixed(1)
                              : "N/A"}
                          </span>

                          <span>
                            {isTV
                              ? "TV"
                              : "Movie"}
                          </span>

                        </div>

                        <button
                          className="remove-list-button"
                          onClick={(event) => {

                            event.stopPropagation()

                            removeFromMyList(
                              item.id
                            )

                          }}
                        >
                          🗑 Remove
                        </button>

                      </div>

                    </div>

                  )

                })}

              </div>

            </section>

          )}

        </>

      )}


      {/* =====================================================
          MOVIE DETAILS
          ===================================================== */}

      {selectedMovie && (

        <MovieDetails
          movie={selectedMovie}

          onClose={() =>
            setSelectedMovie(null)
          }

          onWatchNow={
            handleWatchMovieTrailer
          }

          onAddToMyList={
            addToMyList
          }

          onRemoveFromMyList={
            removeFromMyList
          }

          isInMyList={
            isInMyList(
              selectedMovie.id
            )
          }
        />

      )}


      {/* =====================================================
          TV SHOW DETAILS
          ===================================================== */}

      {selectedShow && (

        <TVShowDetails
          show={selectedShow}

          onClose={() =>
            setSelectedShow(null)
          }

          onWatchNow={
            handleWatchTVTrailer
          }

          onAddToMyList={
            addToMyList
          }

          onRemoveFromMyList={
            removeFromMyList
          }

          isInMyList={
            isInMyList(
              selectedShow.id
            )
          }
        />

      )}


      {/* =====================================================
          TRAILER MODAL
          ===================================================== */}

      <TrailerModal
        videoKey={trailerKey}
        onClose={closeTrailer}
      />

    </div>
  )
}


/* =========================================================
   APP ROUTES
   ========================================================= */

function App() {

  return (

    <Routes>

      {/* LOGIN */}

      <Route
        path="/login"
        element={<Login />}
      />


      {/* SIGNUP */}

      <Route
        path="/signup"
        element={<Signup />}
      />


      {/* ACCOUNT */}

      <Route
        path="/account"
        element={
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        }
      />


      {/* HOME */}

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MoviesApp />
          </ProtectedRoute>
        }
      />


      {/* UNKNOWN URL */}

      <Route
        path="*"
        element={
          <ProtectedRoute>
            <MoviesApp />
          </ProtectedRoute>
        }
      />

    </Routes>

  )
}


export default App