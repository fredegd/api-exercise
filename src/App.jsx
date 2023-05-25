import React, { useState, useEffect } from "react";
import axios from "axios";
import InputForm from "./components/InputForm";
import PostLists from "./components/PostLists";

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
    <div>
      <h1>Posts</h1>
      
        <InputForm posts={posts}/>
        <PostLists posts={posts}/> 
    </div>
  );
};

export default App;
