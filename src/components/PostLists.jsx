import React from 'react'
import PostListItem from './PostListItem'


export default function PostLists({posts}){
  return (    
    <div className='post-list'>
       {posts.map((post) => {
        return <PostListItem key={post.id} post={post} />
      })}
    </div>
  )
}


