import React from "react";
import axios from "axios";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function PostListItem({ post }) {
  const commentUrl = `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`;
  const userUrl = `https://jsonplaceholder.typicode.com/users/${post.userId}`;
  const [comments, setComments] = useState();
  const [user, setuser] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);


  const deletePost = () =>{
    axios.delete(
      `https://jsonplaceholder.typicode.com/posts/${post.Id}`
    );
    const updatedPosts = posts.filter((post) => post.id !== post.id);
      setPosts(updatedPosts);
  }


  const getComments = () => {
    if (comments) {
      setComments();
    } else {
      axios
        .get(commentUrl)
        .then((response) => {
          console.log(response.data);
          setComments(response.data);
          setShowCommentModal(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };



  const getUser = () => {
      axios
        .get(userUrl)
        .then((response) => {
          setuser(response.data);
          setShowModal(true);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <button>Edit</button>
      <button onClick={deletePost}>Delete</button>

      <button onClick={getComments}>{/* {comments ? "Hide" : "Show"} */}Comments</button>

      <button onClick={getUser}>Show User</button>

      {user && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>User Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Website: {user.website}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={getUser}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}


{comments && (
        <Modal show={showCommentModal} onHide={() => setShowCommentModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Comments</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ul>
              {comments.map((comment) => (
                <li key={comment.id}>
                  <h4>{comment.name}</h4>
                  <p>{comment.body}</p>
                </li>
              ))}
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowCommentModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}










    </div>
  );
}