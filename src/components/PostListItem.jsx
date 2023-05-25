import React from "react";
import axios from "axios";
import { useState } from "react";

export default function PostListItem({ post }) {
  const commentUrl = `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`;
  const userUrl = `https://jsonplaceholder.typicode.com/users/${post.userId}`;
  const [comments, setComments] = useState();
  const [user, setUser] = useState();

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
      <button>Delete</button>
      <button onClick={getComments}>Show Comments</button>
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