import { NavLink, useNavigate } from "react-router-dom";
import blogImage from "../assets/Logo.svg";
import "./nav.style.css";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { API_URL } from "../config";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setLoading(false);
          return;
        }

        const res = await axios.get(`${API_URL}/getUser`, {
          headers: {
            Authorization: token,
          },
        });

        setUser(res.data.data.username);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar">
      {/* Left */}
      <div className="nav-left">
        <img src={blogImage} alt="Blogs Logo" className="nav-logo" />
      </div>

      {/* Right */}
      <div className="nav-right">
        <NavLink to="/main-layout" className="nav-link">
          Home
        </NavLink>
        <NavLink to="add-blog" className="nav-link">
          Add Blogs
        </NavLink>

        <NavLink to="myblogs" className="nav-link">
          My Blogs
        </NavLink>

        <div className="user-menu" ref={dropdownRef}>
          <div
            className="user-trigger"
            onClick={() => setOpen((prev) => !prev)}
          >
            <div className="user-avatar">👤</div>
            <span className="user-name">
              {loading ? "Loading..." : user || "Guest"}
            </span>
          </div>

          {open && user && (
            <div className="dropdown-menu">
              <button className="dropdown-item" onClick={handleLogout}>
                Logout👋
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
