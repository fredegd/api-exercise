import React from "react";
import { useState } from "react";


 const InputForm = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");


    const createPost = (e) => {
        e.preventDefault();
        const date = new Date();
        const post = {
          userId: 1,
          id: date.getTime(),
          title: title,
          body: content
        };
        setPosts([...posts, post]);
        console.log(post)
      };


  return (
    <div>

<form action="" onSubmit={createPost}>
      <input
        type="text"
        placeholder="title"
        onChange={(e) => {
            setTitle(e.target.value);
          }}
        required
      ></input>
      <input
        type="text"
        placeholder="content"
        onChange={(e) => {
            setContent(e.target.value);
          }}
        required
      ></input>
      <button type="submit">create Post</button>
    </form>

    </div>
    
  );
};

export default InputForm