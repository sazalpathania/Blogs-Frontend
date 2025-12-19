import { NavLink } from "react-router-dom";
import blogImage from "../assets/Logo.svg";
import "./nav.style.css";

const Navbar = () => {
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
          <span className="user-name">Testuser</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
