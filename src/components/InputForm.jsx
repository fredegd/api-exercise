import React from "react";
import axios from "axios";

import { useState } from "react";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../App.css';
//
//
//
//
export default function InputForm({posts, setPosts}){
   const [userId, setUserId] = useState("");
   const [title, setTitle] = useState("");
   const [body, setBody] = useState("");

 const createPost = (e) => {
       e.preventDefault();
       axios.post("https://jsonplaceholder.typicode.com/posts",{title, body, userId})
        .then((response)=>{
          const newPost = response.data;
         setPosts([newPost, ...posts]);
         setUserId("");//to clear the input fields after sumbmition
         setTitle("");//to clear the input fields after sumbmition
         setBody("");//to clear the input fields after sumbmition
        })
        .catch (error => console.error("Error creating post:", error))
      };

    return(
      <>
      <Container className="col-12 col-sm-10 col-md-9 col-lg-7 col-xl-5 rounded-5 border border-light border-3">
      <Form onSubmit={createPost}>
        <Form.Group className="mb-3" controlId="formBasicText" >
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Enter The Title"  onChange={(e) => setTitle(e.target.value)} value={title} />
        </Form.Group>

        <Form.Group className="mb-3"  controlId="formBasicText">
          <Form.Label>Message</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Enter The Message" onChange={(e) => setBody(e.target.value)} value={body}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicNumbers">
          <Form.Label>UserId</Form.Label>
          <Form.Control type="text" placeholder="Enter your user ID" onChange={(e) => setUserId(e.target.value)} value={userId}/>
        </Form.Group>
      <Button variant="primary" type="submit" className="border border-light border-1">
      <i className="bi bi-send-fill fs-4 "></i>
      </Button>
      
    </Form>
    </Container>

      </>
    )
}