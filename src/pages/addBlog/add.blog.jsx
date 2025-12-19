import React, { useState } from "react";
import { API_URL2 } from "../../config";
import axios from "axios";

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
      <div>
        <h1>Add Blogs</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            placeholder="Enter title..."
            onChange={(e) => setTitle(e.target.value)}
          ></input>

          <textarea
            type="text"
            value={description}
            placeholder="Enter description..."
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          ></input>

          <button type="submit">{loading ? "Uploading..." : "Add Blog"}</button>
        </form>
      </div>
    </>
  );
}

export default AddBlog;
