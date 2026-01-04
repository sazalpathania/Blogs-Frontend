import React, { useEffect, useState } from "react";
import BlogCard from "../blogCard/blog.card.component";
import { API_URL2 } from "../../config";
import axios from "axios";
import "./dashboard.style.css";

function Dashboard() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${API_URL2}/get`);

        setBlogs(res.data.blog || []);
      } catch (error) {
        console.error("Internal server error", error);
        setBlogs([]);
        setError("Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <div>Loading blogs...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="blog-grid">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </>
  );
}

export default Dashboard;
