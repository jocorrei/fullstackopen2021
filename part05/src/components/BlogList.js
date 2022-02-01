import React from 'react'
import Blog from './Blog'
import PropTypes from 'prop-types'

const BlogList = ({ blogs, setBlogs, user }) => {
  return(
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} setBlogs={setBlogs} user={user}/>
      )}
    </div>)
}

BlogList.propTypes = {
  blogs: PropTypes.array,
  user: PropTypes.object,
  setBlogs: PropTypes.func
}

export default BlogList