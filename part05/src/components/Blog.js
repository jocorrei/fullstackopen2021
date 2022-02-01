import {React, useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({blog, setBlogs}) => {

  const [blogVisible, setBlogVisible] = useState(false)
  const showWhenVisible = {display: blogVisible ? 'none' : ''}
  const hideWhenVisible = {display: blogVisible ? '' : 'none'}
  
  const handleLike = async (event) => {
    event.preventDefault()
    const newObject = {... blog, likes: blog.likes + 1, user: blog.user.id}
    delete newObject.id
    const id = blog.id
    await blogService.updateLike(newObject, id)
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }
  
  console.log(blog.id);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
  <div style={blogStyle}>
    {blog.title} {blog.author}
    <div style={showWhenVisible}>
    <button onClick={() => {setBlogVisible(true)}}>view</button>
    </div>
    <div style={hideWhenVisible}>
      <p>{blog.url}</p>
        likes {blog.likes}
        <button onClick={handleLike}>like</button>
      <p>user {blog.user.username}</p>
      <button onClick={() => {setBlogVisible(false)}}>hide</button>
    </div>
  </div>) 
}

export default Blog