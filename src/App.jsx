import  React  from "react";
import { useState ,useEffect } from 'react'
import axios  from "axios";
import './App.css'
import PostLists from "./assets/components/PostLists";
import InputForm from "./assets/components/InputForm";
import PostListItem from "./assets/components/PostListItem";


function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
  
      .then((response) => {
        console.log(response + "is the response");
        setPosts(response.data);
        console.log("posts updated");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  
  return (
    <div>
   <InputForm  />
    <PostLists />
    </div>
  
    
  )
}

export default App
