import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Account.css"

function Account() {
  const navigate = useNavigate()

  const [searchText, setSearchText] = useState("")
  const [filter, setFilter] = useState("all")

  const savedUser = localStorage.getItem("user")

  const user = savedUser
    ? JSON.parse(savedUser)
    : null

  const savedMyList = localStorage.getItem("myList")

  const myList = savedMyList
    ? JSON.parse(savedMyList)
    : []

  function handleLogout() {
    localStorage.removeItem("isLoggedIn")
    navigate("/login")
  }

  const filteredList = myList.filter((item) => {
    const itemName = item.title || item.name || ""

    const matchesSearch = itemName
      .toLowerCase()
      .includes(searchText.toLowerCase())

    const isMovie = item.title && !item.name
    const isTVShow = item.name && !item.title

    const matchesFilter =
      filter === "all" ||
      (filter === "movies" && isMovie) ||
      (filter === "tv" && isTVShow)

    return matchesSearch && matchesFilter
  })

  const movieCount = myList.filter(
    (item) => item.title && !item.name
  ).length

  const tvCount = myList.filter(
    (item) => item.name && !item.title
  ).length

  return (
    <div className="account-page">

      <div className="account-box">

        <h1>My Account</h1>

        {/* ACCOUNT INFORMATION */}

        {user ? (
          <div className="account-info">

            <p>
              <strong>Name:</strong>{" "}
              {user.name}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {user.email}
            </p>

          </div>
        ) : (
          <div className="account-info">

            <p>
              No account information found.
            </p>

            <button
              onClick={() => navigate("/signup")}
            >
              Create Account
            </button>

          </div>
        )}

        {/* ACCOUNT STATS */}

        <div className="account-stats">

          <div className="account-stat">
            <span className="stat-number">
              {myList.length}
            </span>

            <span className="stat-label">
              My List
            </span>
          </div>

          <div className="account-stat">
            <span className="stat-number">
              {movieCount}
            </span>

            <span className="stat-label">
              Movies
            </span>
          </div>

          <div className="account-stat">
            <span className="stat-number">
              {tvCount}
            </span>

            <span className="stat-label">
              TV Shows
            </span>
          </div>

        </div>

        {/* MY LIST */}

        <div className="my-list-section">

          <h2>My List</h2>

          {myList.length > 0 && (
            <>
              {/* SEARCH */}

              <div className="account-search">

                <input
                  type="text"
                  placeholder="Search My List..."
                  value={searchText}
                  onChange={(event) =>
                    setSearchText(event.target.value)
                  }
                />

              </div>

              {/* FILTER BUTTONS */}

              <div className="account-filters">

                <button
                  className={
                    filter === "all"
                      ? "active"
                      : ""
                  }
                  onClick={() => setFilter("all")}
                >
                  All
                </button>

                <button
                  className={
                    filter === "movies"
                      ? "active"
                      : ""
                  }
                  onClick={() => setFilter("movies")}
                >
                  Movies
                </button>

                <button
                  className={
                    filter === "tv"
                      ? "active"
                      : ""
                  }
                  onClick={() => setFilter("tv")}
                >
                  TV Shows
                </button>

              </div>
            </>
          )}

          {/* EMPTY LIST */}

          {myList.length === 0 ? (

            <div className="account-empty-list">

              <div className="account-empty-icon">
                🎬
              </div>

              <h3>
                Your list is empty
              </h3>

              <p>
                Add movies or TV shows to
                your list to see them here.
              </p>

            </div>

          ) : filteredList.length === 0 ? (

            <div className="account-empty-list">

              <div className="account-empty-icon">
                🔍
              </div>

              <h3>
                No results found
              </h3>

              <p>
                Try another search or filter.
              </p>

            </div>

          ) : (

            <div className="account-movies">

              {filteredList.map((item) => (

                <div
                  className="account-movie"
                  key={item.id}
                >

                  {item.poster_path ? (

                    <img
                      src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                      alt={
                        item.title ||
                        item.name
                      }
                    />

                  ) : (

                    <div className="account-no-image">
                      No Image
                    </div>

                  )}

                  <p>
                    {item.title ||
                      item.name}
                  </p>

                  <span className="account-type">
                    {item.title
                      ? "Movie"
                      : "TV Show"}
                  </span>

                </div>

              ))}

            </div>

          )}

        </div>

        {/* BUTTONS */}

        <button
          className="account-list-button"
          onClick={() => navigate("/")}
        >
          🎬 Go to Movies
        </button>

        <button
          className="account-logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </div>
  )
}

export default Account