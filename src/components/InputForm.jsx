import React from "react";
import axios from "axios";

import { useState } from "react";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import {posts, setPosts} from '../App'
//
//
//
export default function InputForm({posts, setPosts}){
  console.log(setPosts)
   const [userId, setUserId] = useState("");
   const [title, setTitle] = useState("");
   const [body, setBody] = useState("");

 const createPost = (e) => {
       e.preventDefault();
       axios.post("https://jsonplaceholder.typicode.com/posts",{title, body, userId})
        .then((response)=>{
          const newPost = response.data;
         setPosts([newPost, ...posts]);
        })
        .catch (error => console.error("Error creating post:", error))
      };

    return(
      <>
      <Container className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
      <Form onSubmit={createPost}>
      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Text className="text-muted">
          Share with the World what are you thinking today
        </Form.Text>
       </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicText" >
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Enter The Title"  onChange={(e) => setTitle(e.target.value)}  />
        </Form.Group>

        <Form.Group className="mb-3"  controlId="formBasicText">
          <Form.Label>Message</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Enter The Message" onChange={(e) => setBody(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicNumbers">
          <Form.Label>UserId</Form.Label>
          <Form.Control type="text" placeholder="Enter your user ID" onChange={(e) => setUserId(e.target.value)}/>
        </Form.Group>

      
      <Button variant="primary" type="submit">
        Submit Post
      </Button>
    </Form>
    </Container>

      </>
    )
}