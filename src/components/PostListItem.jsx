import React from "react";
import axios from "axios";
import { useState } from "react";
import Toast from "react-bootstrap/Toast";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

export default function PostListItem({ post }) {
  const commentUrl = `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`;
  const userUrl = `https://jsonplaceholder.typicode.com/users/${post.userId}`;
  const [comments, setComments] = useState();
  const [user, setUser] = useState();
  
  const [show, toggleShow] = useState(false);


  const deletePost = () =>{
    axios.delete(
      `https://jsonplaceholder.typicode.com/posts/${post.Id}`
    );
    const updatedPosts = posts.filter((post) => post.id !== post.id);
      setPosts(updatedPosts);
  }

  const getComments = () => {
    comments? setComments() : axios
      .get(commentUrl)
      .then((response) => {
        console.log(response.data);
        setComments(response.data);
        console.log(comments);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUser = () => {
   user ?  setUser("")    : axios
      .get(userUrl)
      .then((response) => {
    setUser(response.data);
      console.log(user.show)
    })
    .catch((err) => {
      console.log(err);
    })
   
  };

  return (
    <div>
      
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <button>Edit</button>
      <button onClick={deletePost}>Delete</button>
      <button onClick={getComments}>{comments?"Hide":"Show"} Comments</button>
      <button onClick={getUser}>{user?"Hide":"Show"} User</button>

      {user && (
        <div className="user-section">
           <h3>User Information</h3>
           <p>Name: {user.name}</p>
           <p>Email: {user.email}</p>
           <p>Website: {user.website}</p>
        </div>
      )}

      {comments && (
        <div className="comment-section">
          <ul>
          {comments.map((comment) => (
              <li key={comment.id}>
                <h4>{comment.name}</h4>
                <p>{comment.body}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
