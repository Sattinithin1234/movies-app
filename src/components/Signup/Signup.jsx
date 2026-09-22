import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Signup.css"

function Signup() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill all fields")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    // Save user information temporarily
    const user = {
      name,
      email,
      password
    }

    localStorage.setItem("user", JSON.stringify(user))

    setError("")

    // Go to login page
    navigate("/login")
  }

  return (
    <div className="signup-page">

      <div className="signup-box">

        <h1>Create Account</h1>

        <p className="signup-subtitle">
          Create your Movies App account.
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(event) =>
              setConfirmPassword(event.target.value)
            }
          />

          {error && (
            <p className="signup-error">
              {error}
            </p>
          )}

          <button type="submit">
            Sign Up
          </button>

        </form>

        <p className="login-text">
          Already have an account?{" "}

          <Link to="/login">
            Sign in
          </Link>
        </p>

      </div>

    </div>
  )
}

export default Signup