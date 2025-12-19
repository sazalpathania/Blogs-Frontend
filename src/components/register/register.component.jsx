import { useState } from "react";
import "./register.style.css";
import Logo from "../../assets/Logo.svg";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await axios.post(`${API_URL}/register`, {
        username,
        email,
        password,
      });

      setSuccess("Account created succesfully");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="logo">
          <img src={Logo} alt="logo" />
        </div>

        <h2 className="title">Adventure starts here 🚀</h2>
        <p className="subtitle">
          Please sign-up to your account and start the adventure
        </p>

        {error ? <p style={{ color: "red" }}>{error}</p> : ""}
        {success ? <p style={{ color: "green" }}>{success}</p> : ""}

        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>

        <p className="signin-link">
          Already have an account? <a href="/">Sign in</a>
        </p>
      </div>
    </div>
  );
}
