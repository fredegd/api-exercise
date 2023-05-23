import React from 'react'
import PostListItem from './PostListItem'
import { useState } from 'react'

const PostLists = (props) =>{
  const [posts, setPosts] = useState([]);



  return (

    
    <div>
        

       <PostListItem />
    </div>
  )
}

export default PostLists

  