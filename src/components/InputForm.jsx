import React from "react";
import axios from "axios";

import { useState } from "react";


export default function InputForm(posts){

   const [userId, setUserId] = useState("");
   const [title, setTitle] = useState("");
   const [body, setBody] = useState("");

 const createPost = () => {
       axios.post("https://jsonplaceholder.typicode.com/posts",{title, body, userId})
        .then((response)=>{
          const newPost = response.data;
         console.log(response.data)
          setPosts([...posts, newPost]);
          setTitle("");
          setBody("");
          setUserId("");
        })
        .catch (error => console.error("Error creating post:", error))
      };

    return(
        <form  onSubmit={(e)=>{
          e.preventDefault();
          createPost();
         }}>
        <input  type="text" placeholder="Title"  value={title}onChange={(e) => setTitle(e.target.value)}/>
        <input  type="text" placeholder="Body"   value={body}onChange={(e) => setBody(e.target.value)} />
        <input  type="text" placeholder="User ID"value={userId}onChange={(e) => setUserId(e.target.value)}/>
        <button type="submit" >Create Post</button>
      </form>
    )
}