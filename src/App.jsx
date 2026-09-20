import { useEffect, useState } from "react"

import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import MovieRow from "./components/MovieRow"
import TVShowRow from "./components/TVShowRow"
import MovieDetails from "./components/MovieDetails"
import TVShowDetails from "./components/TVShowDetails"

import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getPopularTVShows,
  searchMulti
} from "./services/movieApi"

function App() {
  // Selected movie for details popup
  const [selectedMovie, setSelectedMovie] = useState(null)

  // Selected TV show for details popup
  const [selectedShow, setSelectedShow] = useState(null)

  // Search text
  const [searchText, setSearchText] = useState("")

  // Search results
  const [searchResults, setSearchResults] = useState([])

  // My List
  const [myList, setMyList] = useState(() => {
    const savedList = localStorage.getItem("myList")

    return savedList ? JSON.parse(savedList) : []
  })

  // Movie data
  const [trendingMovies, setTrendingMovies] = useState([])
  const [popularMovies, setPopularMovies] = useState([])
  const [topRatedMovies, setTopRatedMovies] = useState([])

  // TV shows
  const [tvShows, setTVShows] = useState([])

  // Loading and error
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // Save My List whenever it changes
  useEffect(() => {
    localStorage.setItem("myList", JSON.stringify(myList))
  }, [myList])

  // Load movies and TV shows
  useEffect(() => {
    async function loadData() {
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

        setTrendingMovies(
          trending.map((movie) => ({
            ...movie,
            type: "movie"
          }))
        )

        setPopularMovies(
          popular.map((movie) => ({
            ...movie,
            type: "movie"
          }))
        )

        setTopRatedMovies(
          topRated.map((movie) => ({
            ...movie,
            type: "movie"
          }))
        )

        setTVShows(
          tv.map((show) => ({
            ...show,
            type: "tv"
          }))
        )
      } catch (error) {
        console.error("Loading Error:", error)

        setError(
          "Something went wrong while loading movies."
        )
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Search movies and TV shows
  useEffect(() => {
    async function performSearch() {
      if (!searchText.trim()) {
        setSearchResults([])
        return
      }

      try {
        const results = await searchMulti(searchText)

        setSearchResults(results)
      } catch (error) {
        console.error("Search Error:", error)

        setSearchResults([])
      }
    }

    performSearch()
  }, [searchText])

  // Add movie or TV show to My List
  function addToMyList(item) {
    setMyList((currentList) => {
      const alreadyExists = currentList.some(
        (movie) =>
          movie.id === item.id &&
          movie.type === item.type
      )

      if (alreadyExists) {
        return currentList
      }

      return [...currentList, item]
    })
  }

  // Remove movie or TV show from My List
  function removeFromMyList(id, type) {
    setMyList((currentList) =>
      currentList.filter((item) => {
        if (type) {
          return !(
            item.id === id &&
            item.type === type
          )
        }

        return item.id !== id
      })
    )
  }

  // Check whether item is already in My List
  function isInMyList(id, type) {
    return myList.some(
      (item) =>
        item.id === id &&
        item.type === type
    )
  }

  // Loading screen
  if (loading) {
    return (
      <div className="app">
        <Navbar
          searchText={searchText}
          onSearch={setSearchText}
        />

        <div className="loading-container">
          <h2>Loading Movies...</h2>
        </div>
      </div>
    )
  }

  // Error screen
  if (error) {
    return (
      <div className="app">
        <Navbar
          searchText={searchText}
          onSearch={setSearchText}
        />

        <div className="error-container">
          <h2>Something went wrong</h2>

          <p>{error}</p>

          <button
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="app">

      {/* Navbar */}
      <Navbar
        searchText={searchText}
        onSearch={setSearchText}
      />

      {/* Search Results */}
      {searchText.trim() ? (
        <section className="search-results">

          <h2>
            Search Results for "{searchText}"
          </h2>

          {searchResults.length === 0 ? (
            <div className="empty-list">

              <div className="empty-list-icon">
                🔍
              </div>

              <h3>No results found</h3>

              <p>
                Try searching for another movie
                or TV show.
              </p>

            </div>
          ) : (
            <div className="movie-grid">

              {searchResults.map((item) => (
                <div
                  className="movie-card"
                  key={`${item.type}-${item.id}`}
                  onClick={() => {
                    if (item.type === "tv") {
                      setSelectedShow(item)
                    } else {
                      setSelectedMovie(item)
                    }
                  }}
                >

                  <div className="movie-image-container">

                    <img
                      src={item.image}
                      alt={item.title}
                    />

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

                  <h3>{item.title}</h3>

                  <div className="movie-info">

                    <span>
                      ⭐ {item.rating}
                    </span>

                    <span>
                      {item.type === "tv"
                        ? "TV"
                        : "HD"}
                    </span>

                  </div>

                </div>
              ))}

            </div>
          )}

        </section>
      ) : (

        <>
          {/* Home */}
          <section id="home">

            <Hero
              movie={trendingMovies[0]}

              isInMyList={
                isInMyList(
                  trendingMovies[0]?.id,
                  "movie"
                )
              }

              onAddToMyList={(movie) =>
                addToMyList({
                  ...movie,
                  type: "movie"
                })
              }

              onRemoveFromMyList={(id) =>
                removeFromMyList(
                  id,
                  "movie"
                )
              }
            />

          </section>

          {/* Movies */}
          <section id="movies">

            <MovieRow
              title="Trending Movies"
              movies={trendingMovies}
              onMovieClick={setSelectedMovie}
            />

            <MovieRow
              title="Popular Movies"
              movies={popularMovies}
              onMovieClick={setSelectedMovie}
            />

            <MovieRow
              title="Top Rated Movies"
              movies={topRatedMovies}
              onMovieClick={setSelectedMovie}
            />

          </section>

          {/* TV Shows */}
          <section id="tv-shows">

            <TVShowRow
              title="Popular TV Shows"
              shows={tvShows}
              onShowClick={setSelectedShow}
            />

          </section>

          {/* My List */}
          <section
            id="my-list"
            className="movie-section"
          >

            <h2>My List</h2>

            {myList.length === 0 ? (

              <div className="empty-list">

                <div className="empty-list-icon">
                  🎬
                </div>

                <h3>
                  Your list is empty
                </h3>

                <p>
                  Add movies and TV shows
                  to watch them later.
                </p>

              </div>

            ) : (

              <div className="movie-grid">

                {myList.map((item) => (

                  <div
                    className="movie-card"
                    key={`${item.type}-${item.id}`}
                    onClick={() => {

                      if (item.type === "tv") {
                        setSelectedShow(item)
                      } else {
                        setSelectedMovie(item)
                      }

                    }}
                  >

                    <div className="movie-image-container">

                      <img
                        src={item.image}
                        alt={item.title}
                      />

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

                    <h3>{item.title}</h3>

                    <div className="movie-info">

                      <span>
                        ⭐ {item.rating}
                      </span>

                      <span>
                        {item.type === "tv"
                          ? "TV"
                          : "HD"}
                      </span>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </section>

        </>
      )}

      {/* Movie Details Popup */}
      {selectedMovie && (

        <MovieDetails
          movie={selectedMovie}

          onClose={() =>
            setSelectedMovie(null)
          }

          onAddToMyList={(movie) =>
            addToMyList({
              ...movie,
              type: "movie"
            })
          }

          onRemoveFromMyList={(id) =>
            removeFromMyList(
              id,
              "movie"
            )
          }

          isInMyList={
            isInMyList(
              selectedMovie.id,
              "movie"
            )
          }
        />

      )}

      {/* TV Show Details Popup */}
      {selectedShow && (

        <TVShowDetails
          show={selectedShow}

          onClose={() =>
            setSelectedShow(null)
          }

          onAddToMyList={(show) =>
            addToMyList({
              ...show,
              type: "tv"
            })
          }

          onRemoveFromMyList={(id) =>
            removeFromMyList(
              id,
              "tv"
            )
          }

          isInMyList={
            isInMyList(
              selectedShow.id,
              "tv"
            )
          }
        />

      )}

    </div>
  )
}

export default App