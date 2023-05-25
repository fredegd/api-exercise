import React, { useState, useEffect } from "react";
import axios from "axios";

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
      
        {/* <InputForm />*/}
        <PostLists posts={posts}/> 
    </div>
  );
};

export default App;
