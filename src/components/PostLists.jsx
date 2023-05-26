import React from 'react'
import PostListItem from './PostListItem'


export default function PostLists({posts}){
  return (    
    <div className='post-list col-12 col-sm-11 col-md-10 col-lg-9 col-xl-8'>
       {posts.map((post) => {
        return <PostListItem key={post.id} post={post} />
      })}
    </div>
  )
}


