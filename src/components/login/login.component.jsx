import Logo from "../../assets/Logo.svg";
import { useState } from "react";
import "./login.style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/main-layout");
    } catch (error) {
      setError(error.response?.data?.message);
    }
  };

  return (
    <>
      <section className="login-layout">
        <div className="login-form">
          <img alt="Logo" src={Logo}></img>
          <h1>Welcome to Blogs 👋</h1>
          <p>Pleade sign in to your account and start adventure </p>

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
              <div className="invalid-feedback">Invalid email format</div>
            </div>
            <div className="mb-3">
              <label className="form-label" for="formPassword">
                Password
              </label>
              <div className="adding-eye-icon">
                <input
                  type="password"
                  placeholder="Enter your password"
                  id="formPassword"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
                <div style={{ cursor: "pointer" }}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.439 15.439C20.3636 14.5212 21.0775 13.6091 21.544 12.955C21.848 12.5287 22 12.3155 22 12C22 11.6845 21.848 11.4713 21.544 11.045C20.1779 9.12944 16.6892 5 12 5C11.0922 5 10.2294 5.15476 9.41827 5.41827M6.74742 6.74742C4.73118 8.1072 3.24215 9.94266 2.45604 11.045C2.15201 11.4713 2 11.6845 2 12C2 12.3155 2.15201 12.5287 2.45604 12.955C3.8221 14.8706 7.31078 19 12 19C13.9908 19 15.7651 18.2557 17.2526 17.2526"
                      stroke="#545454"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M9.85786 10C9.32783 10.53 9 11.2623 9 12.0711C9 13.6887 10.3113 15 11.9289 15C12.7377 15 13.47 14.6722 14 14.1421"
                      stroke="#545454"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    ></path>
                    <path
                      d="M3 3L21 21"
                      stroke="#545454"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </div>
              </div>
              <div className="invalid-feedback"></div>
            </div>
            <div className="mb-3 check-w-forgot">
              <a href="/forgot-password" data-discover="true">
                Forgot Password?
              </a>
            </div>
            <button type="submit">Login</button>
            <div className="create-link">
              "New to our platform ? "
              <a href="/register" data-discover="true">
                Create an account
              </a>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};
