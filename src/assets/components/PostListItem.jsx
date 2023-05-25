import React from 'react'
import EditPost from "./EditPost";

export default function PostListItem({post}){

  const [postInfo, setPostInfo] = useState()


  const getPosts = () => {
    axios
      .get(post)
      .then((response) => {
        setPostInfo(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  

  return (
        <div key={post.id} className='post-list-item'>
        <h2>{post.title}</h2>
        <p>{post.body}</p>

        {selectedPostId === post.id ? (
          <EditPost postId={post.id} onSave={handleSavePost} />
        ) : (
          <>
            <button onClick={() => updatePost(post.id)}>Edit</button>
            {/* Rest of the code */}
          </>
        )}

        <button onClick={() => deletePost(post.id)}>Delete</button>

        {post.comments ? (
          <>
            <button onClick={() => fetchComments(post.id)}>
              Hide Comments
            </button>
            {post.comments.length > 0 && (
              <ul>
                {post.comments.map((comment) => (
                  <li key={comment.id}>
                    <h4>{comment.name}</h4>
                    <p>{comment.body}</p>
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <button onClick={() => fetchComments(post.id)}>
            Show Comments
          </button>
        )}
        {post.user ? (
          <>
            <button onClick={() => fetchUser(post.id, post.userId)}>
              Hide User
            </button>
            {post.user && (
              <div>
                <h3>User Information</h3>
                <p>Name: {post.user.name}</p>
                <p>Email: {post.user.email}</p>
                <p>Website: {post.user.website}</p>
              </div>
            )}
          </>
        ) : (
          <button onClick={() => fetchUser(post.id, post.userId)}>
            Show User
          </button>
        )}
        </div>
     
  )
}


// const fetchComments = async (postId) => {
//   try {
//     const commentsLoaded = posts.find((post) => post.id === postId).comments;
//     if (commentsLoaded) {
//       const updatedPosts = posts.map((post) =>
//         post.id === postId ? { ...post, comments: null } : post
//       );
//       setPosts(updatedPosts);
//     } else {
//       const response = await axios.get(
//         `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
//       );
//       const comments = response.data;
//       const updatedPosts = posts.map((post) =>
//         post.id === postId ? { ...post, comments } : post
//       );
//       setPosts(updatedPosts);
//     }
//   } catch (error) {
//     console.error("Error fetching comments:", error);
//   }
// };

// const fetchUser = async (postId, userId) => {
//   try {
//     const postToUpdate = posts.find((post) => post.id === postId);
//     const userLoaded = postToUpdate.user;
//     if (userLoaded) {
//       //??????????
//       const updatedPosts = posts.map((post) =>
//         post.id === postId ? { ...post, user: null } : post
//       );
//       setPosts(updatedPosts);
//     } else {
//       const response = await axios.get(
//         `https://jsonplaceholder.typicode.com/users/${userId}`
//       );
//       const user = response.data;
//       const updatedPosts = posts.map((post) =>
//         post.id === postId ? { ...post, user } : post
//       );
//       setPosts(updatedPosts);
//     }
//   } catch (error) {
//     console.error("Error fetching user:", error);
//   }
// };