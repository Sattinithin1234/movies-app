import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Login.css"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()

    // Check empty fields
    if (!email || !password) {
      setError("Please enter email and password")
      return
    }

    // Get registered user
    const savedUser = localStorage.getItem("user")

    if (!savedUser) {
      setError("No account found. Please sign up first.")
      return
    }

    const user = JSON.parse(savedUser)

    // Check email and password
    if (
      email === user.email &&
      password === user.password
    ) {
      // Login successful
      localStorage.setItem("isLoggedIn", "true")

      setError("")

      navigate("/")
    } else {
      setError("Invalid email or password")
    }
  }

  return (
    <div className="login-page">

      <div className="login-box">

        <h1>Sign In</h1>

        <p className="login-subtitle">
          Sign in to continue watching your favorite movies.
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
          />

          {error && (
            <p className="login-error">
              {error}
            </p>
          )}

          <button type="submit">
            Sign In
          </button>

        </form>

        <p className="signup-text">
          New to Movies App?{" "}

          <Link to="/signup">
            Sign up now
          </Link>
        </p>

      </div>

    </div>
  )
}

export default Login