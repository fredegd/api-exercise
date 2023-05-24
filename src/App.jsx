import React, { useState, useEffect } from "react";
import axios from "axios";

import EditPost from "./assets/components/EditPost";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [editPostId, setEditPostId] = useState(null);

  const [selectedPostId, setSelectedPostId] = useState(null);

  console.log(posts);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const createPost = async () => {
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        {
          title,
          body,
          userId,
        }
      );
      const newPost = response.data;
      setPosts([...posts, newPost]);
      setTitle("");
      setBody("");
      setUserId("");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const updatePost = (postId) => {
    setSelectedPostId(postId);
  };

  const handleSavePost = async (postId, newTitle, newBody) => {
    try {
      const postToUpdate = posts.find((post) => post.id === postId);
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${postId}`,
        {
          title: newTitle,
          body: newBody,
          userId: postToUpdate.userId,
        }
      );

      const updatedPost = response.data;
      const updatedPosts = posts.map((post) =>
        post.id === postId ? updatedPost : post
      );
      setPosts(updatedPosts);
      setEditPostId(null);
      setSelectedPostId(null); // Clear the selected post ID
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const deletePost = async (postId) => {
    try {
      await axios.delete(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
      const updatedPosts = posts.filter((post) => post.id !== postId);
      setPosts(updatedPosts);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const fetchComments = async (postId) => {
    try {
      const commentsLoaded = posts.find((post) => post.id === postId).comments;
      if (commentsLoaded) {
        const updatedPosts = posts.map((post) =>
          post.id === postId ? { ...post, comments: null } : post
        );
        setPosts(updatedPosts);
      } else {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
        );
        const comments = response.data;
        const updatedPosts = posts.map((post) =>
          post.id === postId ? { ...post, comments } : post
        );
        setPosts(updatedPosts);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const fetchUser = async (postId, userId) => {
    try {
      const postToUpdate = posts.find((post) => post.id === postId);
      const userLoaded = postToUpdate.user;
      if (userLoaded) {
        //??????????
        const updatedPosts = posts.map((post) =>
          post.id === postId ? { ...post, user: null } : post
        );
        setPosts(updatedPosts);
      } else {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${userId}`
        );
        const user = response.data;
        const updatedPosts = posts.map((post) =>
          post.id === postId ? { ...post, user } : post
        );
        setPosts(updatedPosts);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  return (
    <div>
      <h1>Posts</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPost();
        }}
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button type="submit">Create Post</button>
      </form>

      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>

            {selectedPostId === post.id ? (
              <EditPost postId={post.id} onSave={handleSavePost} />
            ) : (
              <>
                <button onClick={() => updatePost(post.id)}>Edit</button>
                {/* Rest of the code */}
              </>
            )}

            <button onClick={() => deletePost(post.id)}>Delete</button>
            {post.comments ? (
              <>
                <button onClick={() => fetchComments(post.id)}>
                  Hide Comments
                </button>
                {post.comments.length > 0 && (
                  <ul>
                    {post.comments.map((comment) => (
                      <li key={comment.id}>
                        <h4>{comment.name}</h4>
                        <p>{comment.body}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <button onClick={() => fetchComments(post.id)}>
                Show Comments
              </button>
            )}
            {post.user ? (
              <>
                <button onClick={() => fetchUser(post.id, post.userId)}>
                  Hide User
                </button>
                {post.user && (
                  <div>
                    <h3>User Information</h3>
                    <p>Name: {post.user.name}</p>
                    <p>Email: {post.user.email}</p>
                    <p>Website: {post.user.website}</p>
                  </div>
                )}
              </>
            ) : (
              <button onClick={() => fetchUser(post.id, post.userId)}>
                Show User
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
