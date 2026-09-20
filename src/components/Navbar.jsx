function Navbar(props) {

  function handleNavigation(event, sectionId) {

    event.preventDefault()

    // Clear search first
    props.onSearch("")

    // Wait for sections to appear
    setTimeout(() => {

      const section =
        document.getElementById(sectionId)

      if (section) {

        section.scrollIntoView({
          behavior: "smooth"
        })

      }

    }, 100)
  }


  function handleSearch(event) {

    props.onSearch(event.target.value)

  }


  return (

    <nav className="navbar">

      {/* LOGO */}

      <h1 className="logo">
        NETFLIX
      </h1>


      {/* NAVIGATION LINKS */}

      <div className="nav-links">

        <a
          href="#home"
          onClick={(event) =>
            handleNavigation(
              event,
              "home"
            )
          }
        >
          Home
        </a>


        <a
          href="#movies"
          onClick={(event) =>
            handleNavigation(
              event,
              "movies"
            )
          }
        >
          Movies
        </a>


        <a
          href="#tv-shows"
          onClick={(event) =>
            handleNavigation(
              event,
              "tv-shows"
            )
          }
        >
          TV Shows
        </a>


        <a
          href="#my-list"
          onClick={(event) =>
            handleNavigation(
              event,
              "my-list"
            )
          }
        >
          My List
        </a>

      </div>


      {/* SEARCH */}

      <div className="search-box">

        <input
          type="text"
          placeholder="Search movies and TV shows..."
          value={props.searchText}
          onChange={handleSearch}
        />


        <button
          type="button"
          onClick={() => {
            document
              .querySelector(".search-box input")
              ?.focus()
          }}
        >
          🔍
        </button>

      </div>

    </nav>

  )
}


export default Navbar