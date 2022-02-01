import React from 'react'
import Blog from './Blog'

const BlogList = ({blogs, blogVisible, setBlogVisible, setBlogs}) => {
	return(
	<div>
		<h2>blogs</h2>
      	{blogs.map(blog =>
        	<Blog key={blog.id} blog={blog} blogVisible={blogVisible} setBlogVisible={setBlogVisible} setBlogs={setBlogs}/>
    	)}
	</div>)
}

export default BlogList