import axios from "axios";
import { useState } from "react";
import { API_URL } from "../config";
import Logo from "../assets/Logo.svg";
import "./forgetpass.style.css";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/forgot-password`, { email });
      setMessage(res.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-layout">
      <div className="login-form">
        <img src={Logo} alt="Logo" />

        <h1>Forgot Password</h1>
        <p>Enter your registered email to reset your password</p>

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
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          <div className="create-link">
            <a href="/">Back to Login</a>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ForgetPassword;
