import React from 'react'
const BlogForm = ({ user, handleLogout, handleCreate, newBlog, setNewBlog, createVisible, setCreateVisible }) => {
  const showWhenVisible = { display: createVisible ? 'none' : '' }
  const hideWhenVisible = { display: createVisible ? '' : 'none' }

  return (
    <div>
      <div>
        <p>logged in as {user.username}</p>
        <button onClick={handleLogout}>logout</button>
        <div style={hideWhenVisible}>
          <button onClick={() => {setCreateVisible(false)}}>create</button>
        </div>
        <div style={showWhenVisible}>
          <h1>Creat blog</h1>
          <form onSubmit={handleCreate}>
		  <div>
		  title:
		  <input
                type="text"
                value={newBlog.title}
                name="Title"
                onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}/>
		  </div>
		  <div>
			url:
			  <input
                type="text"
                value={newBlog.url}
                name='URL'
                onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}/>
		  </div>
		  <div>
			author:
              <input
                type="text"
                value={newBlog.author}
                name='Author'
                onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}/>
		  </div>
		  <button type="submit">create</button>
          </form>
          <button onClick={() => {setCreateVisible(true)}}>cancel</button>
        </div>
      </div>
    </div>
  )
}

export default BlogForm