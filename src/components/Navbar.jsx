import { useNavigate } from "react-router-dom"
import "./Navbar.css"

function Navbar({ searchText, setSearchText }) {

  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem("isLoggedIn")
    navigate("/login")
  }

  function handleMyList() {
    const element = document.getElementById("my-list-section")

    if (element) {
      element.scrollIntoView({
        behavior: "smooth"
      })
    }
  }

  return (
    <nav className="navbar">

      {/* LOGO */}

      <h2
        className="navbar-logo"
        onClick={() => navigate("/")}
      >
        Movies App
      </h2>


      {/* SEARCH */}

      <div className="navbar-search">

        <input
          type="text"
          placeholder="Search movies or TV shows..."
          value={searchText}
          onChange={(event) =>
            setSearchText(event.target.value)
          }
        />

      </div>


      {/* NAVIGATION */}

      <div className="navbar-links">

        <button
          onClick={() => navigate("/")}
        >
          Home
        </button>

        <button
          onClick={handleMyList}
        >
          My List
        </button>

        <button
          onClick={() => navigate("/account")}
        >
          Account
        </button>

        <button
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </nav>
  )
}

export default Navbar