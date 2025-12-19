import axios from "axios";
import { useState } from "react";
import { API_URL } from "../config";
import Logo from "../assets/Logo.svg";
import "./forgetpass.style.css";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post(`${API_URL}/forgot-password`, { email });
      setMessage(res.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <section className="login-layout">
      <div className="login-form">
        <img src={Logo} alt="Logo" />

        <h1>Forgot Password 🔐</h1>
        <p>Enter your email and we will send a reset link</p>

        {message && <p className="status-msg">{message}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button type="submit">Send Reset Link</button>

          <div className="create-link">
            <a href="/" data-discover="true">
              Back to Login
            </a>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ForgetPassword;
