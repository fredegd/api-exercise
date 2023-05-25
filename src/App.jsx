import React, { useState, useEffect } from "react";
import axios from "axios";

import EditPost from "./assets/components/EditPost";
import InputForm from "./assets/components/InputForm";
import PostListItem from "./assets/components/PostListItem";

const App = () => {
  const [posts, setPosts] = useState([]);
  

  const [ , setEditPostId] = useState(null);

  const [selectedPostId, setSelectedPostId] = useState(null);

  console.log(posts);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts")
          .then((response)=>{
            setPosts(response.data);
          })
          .catch ((error)=>{
            console.error("Error fetching posts:", error);
          }) 
  }, []);

  

 

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
      
        <InputForm />
        <PostLists posts={posts}/>
    </div>
  );
};

export default App;
