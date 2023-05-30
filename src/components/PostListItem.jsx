import React from "react";
import axios from "axios";
import { useState,useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';




export default function PostListItem({ post }) {
  const commentUrl = `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`;
  const userUrl = `https://jsonplaceholder.typicode.com/users/${post.userId}`;
  const [comments, setComments] = useState();
  const [user, setUser] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(10);
  const [userName, setUserName] = useState();



  const deletePost = () => {
    axios .delete(`https://jsonplaceholder.typicode.com/posts/${post.id}`)
      .then((response) => {
        console.log("post deleted successfully:", response.data); 
        deleteContainer(post.id); // delete a container with its own id. 
      })
      .catch((error) => console.error("Error deleting post:", error));
  };
  const deleteContainer = (containerId) => {
    const container = document.getElementById(containerId);
    if (container) {
      container.remove();
    }
  };



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
          setUser(response.data);
          setShowModal(true);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const getUserName = () => {
    axios
      .get(userUrl)
      .then((response) => {
        setUserName(response.data)
      })
      .catch((err) => {
        console.log(err);
      });
};


  const getLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };
  useEffect(() => {
    getUserName(post.userId);
  }, [post.userId]);

  return (
    <div>
         <Container id={post.id} className="container rounded-5 border border-light border-3">
      {userName && (
          <a className="userName userNameDiv" href="#" onClick={getUser}>
          <i className="bi bi-person-square p-3"></i> {userName.name}
          </a>
        )}
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <Button className="m-3 border-light" ><i className="bi bi-pencil-square fs-4"></i></Button>





      <Button className="m-3 border-light" onClick={deletePost}><i className="bi bi-trash3-fill fs-4"></i></Button>




      <Button className="m-3 border-light"variant="primary" onClick={getComments}><i className="bi bi-chat-text-fill fs-4"></i></Button>
      {/* <Button className="m-3 border-light"onClick={getUser}><i className="bi bi-person-fill-exclamation fs-4"></i></Button> */}

      <Button className="m-3 border-light "onClick={getLike}>{liked ? (
            <>
              <i className="bi bi-hand-thumbs-up-fill fs-4"></i>
              <span className="m-2">{likeCount}</span>
            </>
          ) : (
            <>
              <i className="bi bi-hand-thumbs-up fs-4"></i>
              <span className="m-2">{likeCount}</span>
            </>
          )}</Button>
      
      

      {user && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>User Information</Modal.Title>
          </Modal.Header>
          <Modal.Body className="userModal">
            <div className="popUpBlog">
            <i className="imgIcon bi bi-person-square pb-3"></i>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Website: {user.website}</p>
            </div> 
            
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    
      {/* {userName && (
        <div>
          <p> Name: {userName.name}</p>
        </div>
      )} */}


{comments && (
        <Modal show={showCommentModal} onHide={() => setShowCommentModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Comments</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ul>
              {comments.map((comment) => (
                <li key={comment.id} className="popUpBlog">
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
