import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "../styles/post.scss";

const Post = ({ posts, users, url }) => {
  const [postComments, setPostComments] = useState([]);
  const params = useParams();
  const postId = params.id;
  const post = posts?.find((post) => post.id.toString() === postId);
  const userName = users.users?.find((user) => post.userId === user.id)?.name;

  const getComments = async (id) => {
    const URL = `${url}/comments`;
    const commentsData = await fetch(URL).then((response) => response.json());
    setPostComments(
      commentsData?.filter((data) => data.postId.toString() === id)
    );
  };

  useEffect(() => {
    getComments(postId);
  }, []);

  return (
    <Fragment>
      <div className="post">
        <div className="title">{post?.title}</div>
        <div className="body">
          <div className="text">{post?.body}</div>
          <div className="author">By {userName}</div>
        </div>
      </div>
      <div className="comments">
        {}
        <div className="title">Comments</div>
        {postComments.length ? (
          postComments?.map((comment) => (
            <div className="comment" key={comment.id}>
              <div className="email">From: {comment.email}</div>
              <div className="name">{comment.name}</div>
              <div className="text">{comment.body}</div>
            </div>
          ))
        ) : (
          <div>Just a second, comments are loading...</div>
        )}
      </div>
    </Fragment>
  );
};

export default Post;
