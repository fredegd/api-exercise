import React, { useState, useEffect } from "react";
import axios from "axios";
import InputForm from "./components/InputForm";
import PostLists from "./components/PostLists";

import './App.css';
const App = () => {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts")
          .then((response)=>{
            setPosts(response.data);
          })
          .catch ((error)=>{
            console.error("Error fetching posts:", error);
          }) 
  }, []);  


  return (
    <div className="App">
      <h1 className=" display-2  rounded-4 px-5 fake-post-font">
        <i className="bi bi-balloon-fill display-1">
          </i> 
          FAKE POST 
          </h1>
      
        <InputForm posts={posts} setPosts={setPosts}/>
        <PostLists posts={posts}/> 
    </div>
  );
};

export default App;
