import Logo from "../../assets/Logo.svg";
import { useState, useEffect } from "react";
import "./login.style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pageLoaging, setPageLoading] = useState(true);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const res = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      navigate("/main-layout");
    } catch (error) {
      setError(error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {pageLoaging ? (
        <div className="loader-container">
          <div className="spinner"></div>
          <h1>Loading...</h1>
        </div>
      ) : (
        <section className="login-layout">
          <div className="login-form">
            <img
              alt="Logo"
              src={Logo}
              onLoad={() => setPageLoading(false)}
            ></img>
            <h1>Welcome to Blogs 👋</h1>
            <p>Please sign in to your account and start adventure </p>

            {error ? <p style={{ color: "red" }}>{error}</p> : ""}
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label" for="formEmail">
                  Email or username
                </label>
                <input
                  type="text"
                  id="formEmail"
                  placeholder="Enter your email or username"
                  value={email}
                  name="email"
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="formPassword">
                  Password
                </label>

                <div className="password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    id="formPassword"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <span
                    className="eye-icon"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      // 👁️ OPEN EYE
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M2 12C3.8 7.6 7.8 5 12 5C16.2 5 20.2 7.6 22 12C20.2 16.4 16.2 19 12 19C7.8 19 3.8 16.4 2 12Z"
                          stroke="#545454"
                          strokeWidth="1.5"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          r="3"
                          stroke="#545454"
                          strokeWidth="1.5"
                        />
                      </svg>
                    ) : (
                      // 🚫 CLOSED EYE
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M3 3L21 21"
                          stroke="#545454"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M9.9 5.4C10.6 5.1 11.3 5 12 5C16.2 5 20.2 7.6 22 12C21.3 13.7 20.3 15.1 19.1 16.2"
                          stroke="#545454"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M6.3 7.2C4.7 8.4 3.5 10.1 2 12C3.8 16.4 7.8 19 12 19C13.3 19 14.6 18.7 15.8 18.1"
                          stroke="#545454"
                          strokeWidth="1.5"
                        />
                      </svg>
                    )}
                  </span>
                </div>
              </div>

              <div className="mb-3 check-w-forgot">
                <a href="/forgot-password" data-discover="true">
                  Forgot Password?
                </a>
              </div>
              <button type="submit">
                {isLoading ? "Logging In" : "Login"}
              </button>
              <div className="create-link">
                "New to our platform ? "
                <a href="/register" data-discover="true">
                  Create an account
                </a>
              </div>
            </form>
          </div>
        </section>
      )}
    </>
  );
};
