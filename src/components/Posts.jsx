import PostCard from "./PostCard";

import "../styles/posts.scss";

const Posts = ({ posts }) => {
  return (
    <div className="grid" data-testid="posts">
      {posts?.map((post) => {
        return <PostCard post={post} key={post.id} />;
      })}
    </div>
  );
};

export default Posts;
