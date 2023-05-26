import React from "react";
import axios from "axios";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';



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
      <Container className="container rounded-5 border border-light border-3">
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <Button className="m-3 border-light" ><i class="bi bi-pencil-square fs-4"></i></Button>
      <Button className="m-3 border-light"onClick={deletePost}><i class="bi bi-trash3-fill fs-4"></i></Button>

      <Button className="m-3 border-light"variant="primary" onClick={getComments}><i class="bi bi-chat-text-fill fs-4"></i></Button>

      <Button className="m-3 border-light"onClick={getUser}><i class="bi bi-person-fill-exclamation fs-4"></i></Button>

      {/* <Button className="m-3 border-light"onClick={getLike}><i class="bi bi-hand-thumbs-up-fill"></i></Button> */}

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
            <Button variant="primary" onClick={() => setShowModal(false)}>
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
            <Button variant="primary" onClick={() => setShowCommentModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}


</Container>







    </div>
  );
}