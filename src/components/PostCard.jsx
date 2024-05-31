import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <div className="wrapper">
      <div className="body text-center">
        <div className="title">{post.title}</div>
        <div className="text">{post.body}</div>
      </div>
      <Link to={"/post/" + post.id}>
        <button type="button" className="btn btn-dark">
          View Post
        </button>
      </Link>
    </div>
  );
};

export default PostCard;
