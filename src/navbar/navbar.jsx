import { NavLink } from "react-router-dom";
import blogImage from "../assets/Logo.svg";
import "./nav.style.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";

const Navbar = () => {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

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
        console.log(res, "user");
        console.log(res.data.data.username, "data");
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

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

        {/* User dropdown */}
        <div className="user-menu">
          <div className="user-avatar">👤</div>
          <span className="user-name">{loading ? "Loading...." : user}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
