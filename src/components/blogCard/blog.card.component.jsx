import "./blog.style.css";

const BlogCard = ({
  blog,
  handleDelete,
  showDelete = false,
  showEdit,
  onEdit,
}) => {
  return (
    <>
      <div className="blog-card">
        <h4>{blog.title}</h4>

        <img src={`http://localhost:4000${blog.image}`} alt={blog.image} />

        <p>{blog.content.slice(0, 100)}...</p>

        <div className="author">
          <span>{blog.author?.username}</span>
          <small>{new Date(blog.createdAt).toDateString()}</small>
        </div>

        {showEdit && <button onClick={() => onEdit(blog)}>Edit</button>}

        {showDelete && (
          <button className="delete-btn" onClick={() => handleDelete(blog._id)}>
            Delete
          </button>
        )}
      </div>
    </>
  );
};

export default BlogCard;
