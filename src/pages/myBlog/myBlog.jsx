import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL2 } from "../../config";
import BlogCard from "../../components/blogCard/blog.card.component";
import "./myBlog.style.css";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  //Fetching Blogs//
  const fetchBlogs = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      const res = await axios.get(`${API_URL2}/myblog`, {
        headers: {
          Authorization: token,
        },
      });
      console.log(res.data);
      setBlogs(res.data.blogs);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  //Delete handler//
  const handleDelete = async (blogID) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL2}/delete/${blogID}`, {
        headers: {
          Authorization: token,
        },
      });

      setBlogs(blogs.filter((n) => n._id !== blogID));
    } catch (error) {
      alert("You are not allowed to delete this blog");
      console.log(error, "error");
    }
  };

  if (loading) return <p>Loading.....</p>;
  if (!blogs.length) return <p>You have not created any blogs yet</p>;

  return (
    <div className="my-blogs-container">
      <h2>My Blogs</h2>

      <div className="blog-grid">
        {blogs.map((blog) => (
          <BlogCard
            key={blog._id}
            blog={blog}
            handleDelete={handleDelete}
            showDelete={true}
          />
        ))}
      </div>
    </div>
  );
};

export default MyBlogs;
