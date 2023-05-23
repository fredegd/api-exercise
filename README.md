Fake Posts (Jsonplceholder)


API:  https://jsonplaceholder.typicode.com/

API Routes: 
Get all posts: GET /posts
Create post:  POST /posts
Update post: PUT /posts/:id
Delete post: DELETE /posts/:id
Get all post comments: GET /posts/:id/comments 
Get user: GET /users/:id ( the id here represent the user id while before it was the post id)

Requirements:
Use the API to retrieve all posts (GET request)
Render the posts on the screen
Create a form with an inputs for title, body, and userId
When the form is submitted it should send a POST request to create a new post ( since it is a fake API, it will always respond with a new post with id 101) 
The newly created post should be visible at the end of the rendered posts
Each post should have an Edit
When the Edit button is clicked the user should be able to update the post and send a PUT request to perform the update ( keep in mind that it is a fake API meaning it will respond with the updated post but next time you retrieve it, it will be in it’s original state)
When the update is successful you should modify the rendered post to reflect the new changes ( after refresh it will have the old data back)
Each post should have a delete
When the delete button is clicked, send a DELETE request to delete the post form the API ( since it is fake API, you aren’t actually deleting anything)
If the deletion is successful then remove the post from the rendered list
Each Post should have a button with the text Show Comments
When the button is clicked you should send a GET request to get the comments for that particular post and show them underneath the post
The text for the button should change from Show Comments to Hide Comments
When clicking the button again you should hide the comments ( only show the post)
Each post should have a button Show User
When clicked it should get the user information and view it underneath the post
The text should change to Hide User, and when clicked again it should hide the user information

Guideline (not in full details): 
Create a Github repo
Create a new React app using vite and push it to Github
Install dependencies ( axios )
In `App.js` using axios to get all posts from the API, and render them on the screen ( the posts should be saved in a state inside the App)
Create a <PostsList /> component that you pass all the posts to in a prop
Inside of <PostsList /> component Map over the passed prop that contains all the posts and return a <PostListItem /> component for every post in the array
Pass the post information to the <PostListItem /> component as a prop
In <PostListItem /> add the necessary JSX to show the post in accordance with the requirements above
Create a component <Form /> that you will in the <App /> component, ( the App should render PostsList & Form components )
Add the onSubmit event and make sure to preventDefault() 
Create states to hold the post information. title, body, and userId
onChange update the corresponding state with the value from the input that change
Update the onSubmit function to send an axios POST request to create a new post (there is an example in the slides)
In the .Then() for the post request update the posts state to include the newly created post ( since the state is in the App  then the setter function must be passed as a prop to the Form component so it could be used after saving the new post)
If everything is working correctly then every time you add a new post it should appear at the end of the list, and when refreshing the page you should view the original 100 posts again
Inside PostListItem add a click handler for the Edit button
When clicked it will send a PUT request using axios
axios.put() takes a path as a first parameter and that path should include the id of the post, so make sure to add string concatenation/entroplation so the value is dynamic and not hardcoded
axios.put()  take a second parameter which is the payload that you are planning to send, it should be an object that has the new data you want to send, it should have 2 keys, title, and body ( very similar to how you have created the POST request earlier)
If the update is successful then set a new value for the posts state to include the newly updated post, it should be the same list for the exception that one of the posts now have a new title and/or body ( you could map over the old array and only modify 1 post depending if the id matches or not then set it as the new state)
Similar to the Form you must pass the state setter from the App to the PostsList and then to PostListItem in order to use it in that component 

