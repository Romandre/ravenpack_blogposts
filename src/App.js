import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useSearchParams, useNavigate } from "react-router-dom";

import { fetchPosts } from "./data/postsSlice";
import { fetchUsers } from "./data/usersSlice";
import { ENDPOINT } from "./constants";

import Post from "./components/Post";
import Header from "./components/Header";
import Posts from "./components/Posts";

import "reactjs-popup/dist/index.css";
import "./app.scss";

const App = () => {
  const state = useSelector((state) => state);
  const { posts, users } = state;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchParams] = useSearchParams();
  const selectedUser = searchParams.get("user");

  const filterPostsByUser = useCallback(
    (userId) => {
      navigate("/?user=" + userId);
      setFilteredPosts(
        userId
          ? posts.posts?.filter((post) => post.userId.toString() === userId)
          : []
      );
    },
    [navigate, posts.posts]
  );

  const getPosts = () => {
    dispatch(fetchPosts(`${ENDPOINT}/posts`));
  };

  const getUsers = () => {
    dispatch(fetchUsers(`${ENDPOINT}/users`));
  };

  useEffect(() => {
    getPosts();
    getUsers();
  }, []);

  useEffect(() => {
    if (selectedUser && posts?.fetchStatus === "success") {
      filterPostsByUser(selectedUser);
    }
  }, [posts?.fetchStatus]);

  return (
    <div className="App">
      <Header
        users={users}
        selectedUser={selectedUser}
        filterPostsByUser={filterPostsByUser}
      />

      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              posts.fetchStatus !== "success" ? (
                <div>Just a moment, posts are loading...</div>
              ) : (
                <Posts
                  posts={filteredPosts.length ? filteredPosts : posts.posts}
                />
              )
            }
          />
          <Route
            path="/post/:id"
            element={
              posts.fetchStatus !== "success" ? (
                <div>Just a moment, the post is loading...</div>
              ) : (
                <Post posts={posts.posts} users={users} url={ENDPOINT} />
              )
            }
          />
          <Route
            path="*"
            element={<h1 className="not-found">Page Not Found</h1>}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
