import React, { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState({ title: '', url: '', author: ''})
  const [display, setDisplay] = useState(null)
  const [loginVisible, setLoginVisible] = useState(true)
  const [createVisible, setCreateVisible] = useState(true)
  
  const notificationStyle = {
    display: display,
    color: 'red',
		background: 'lightgrey',
		fontSize: 20,
		borderStyle: 'solid',
		borderRadius: 5,
		padding: 10,
		marginBotton: 10,
		marginTop: 10
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('loggin with ', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      const blogs = await blogService.getAll()
      setBlogs(blogs)

    } catch (exception) {
      setDisplay('block')
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
        setDisplay('none')
      }, 5000)
    }
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    blogService.create(newBlog)
    .then(response => { 
      setDisplay('block')
      setErrorMessage(`${response.title} by ${response.author} added to the list`)
      setTimeout(() => {
        setErrorMessage(null)
        setDisplay('none')
      }, 5000)
    })
    .catch(error => { 
      setDisplay('block')
      setErrorMessage('Invalid input. please fill all form')})
    setTimeout(() => {
      setErrorMessage(null)
      setDisplay('none')
    }, 5000)
    setNewBlog({title: '', url: '', author: ''})
    const updatedBlogs = await blogService.getAll()
    setBlogs(updatedBlogs)
  }
  const handleLogout = async (event) => {
    window.localStorage.clear()
    setUser(null)
    setBlogs([])
  }

  useEffect(() => {
    const fetchData = async () => {
      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs)
    }
    const loggedUserJSON = window.localStorage
    .getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      console.log(user);
      blogService.setToken(user.token)
      fetchData()
    }
  }, [])

  return (
    <div>
      <h1>Blog's Application</h1>
      {errorMessage !== null &&
          <div style={notificationStyle}>
            <h1>{ errorMessage }</h1>
          </div>
          }
      {user == null && <LoginForm handleLogin={handleLogin} username={username} password={password} setPassword={setPassword} setUsername={setUsername} loginVisible={loginVisible} setLoginVisible={setLoginVisible}/>}
      {user !== null && <BlogForm user={user} handleLogout={handleLogout} handleCreate={handleCreate} newBlog={newBlog} setNewBlog={setNewBlog} createVisible={createVisible} setCreateVisible={setCreateVisible}/>}
      {user !== null && <BlogList blogs={blogs} setBlogs={setBlogs}/>}
    </div>
  )
}

export default App