import React, { useState } from "react";
import { API_URL2 } from "../../config";
import axios from "axios";
import "./addblog.style.css";

function AddBlog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !image) {
      alert("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", image);
    try {
      setLoading(true);
      const res = await axios.post(`${API_URL2}/add`, formData, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });

      console.log("res", res.data);
      alert("Blog created successfully");
      setTitle("");
      setDescription("");
      setImage(null);
    } catch (error) {
      alert(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="add-blog-container">
  <h1 className="page-title">Add Blog</h1>

  <form className="add-blog-form" onSubmit={handleSubmit}>
    <label>Title</label>
    <input
      className="input-field"
      type="text"
      value={title}
      placeholder="Write here"
      onChange={(e) => setTitle(e.target.value)}
    />

    <label>Description</label>
    <textarea
      className="textarea-field"
      value={description}
      placeholder="Write here"
      onChange={(e) => setDescription(e.target.value)}
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

    <button className="save-btn" type="submit">
      {loading ? "Uploading..." : "Save"}
    </button>
  </form>
</div>

    </>
  );
}

export default AddBlog;
