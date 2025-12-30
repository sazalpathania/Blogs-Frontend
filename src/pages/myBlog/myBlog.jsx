import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL2 } from "../../config";
import BlogCard from "../../components/blogCard/blog.card.component";
import "./myBlog.style.css";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleEditClick = (blog) => {
    setEditing(blog);
    setTitle(blog.title);
    setDescription(blog.content);
  };

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

  //Edit handler//

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      if (image) formData.append("file", image);

      const res = await axios.put(`${API_URL2}/edit/${editing._id}`, formData, {
        headers: {
          Authorization: token,
        },
      });

      setBlogs(blogs.map((n) => (n._id === editing._id ? res.data.blog : n)));

      setEditing(null);

      alert("Blog updated successfully");
    } catch (error) {
      console.log(error);
      alert("You are not allowed to edit this blog");
    }
  };

  //Delete handler//
  const handleDelete = async (blogID) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmDelete) return;
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
    <>
      <div className="my-blogs-container">
        <h2>My Blogs</h2>

        <div className="blog-grid">
          {blogs.map((blog) => (
            <BlogCard
              key={blog._id}
              blog={blog}
              handleDelete={handleDelete}
              showDelete={true}
              showEdit={true}
              onEdit={handleEditClick}
            />
          ))}
        </div>
      </div>

      {editing && (
        <div className="modal">
          <form onSubmit={handleEditSubmit} className="add-blog-form">
            <h3>Edit Blog</h3>

            <input
              className="input-field"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              required
            />

            <textarea
              className="textarea-field"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              required
            />

            <label>Upload Image</label>
            <div className="upload-box">
              <input
                className="file-input"
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <span>Upload here</span>
            </div>

            <div className="modal-actions">
              <button type="submit">Update</button>
              <button type="button" onClick={() => setEditing(null)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default MyBlogs;
