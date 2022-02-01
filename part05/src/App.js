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
  const [newBlog, setNewBlog] = useState({ title: '', url: '', author: '' })
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
      blogs.sort((a,b) => b.likes - a.likes)
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
        setNewBlog({ title: '', url: '', author: '' })
        blogService.getAll()
          .then(response => {
            //console.log(response);
            response.sort((a,b) => b.likes - a.likes)
            setBlogs(response)
          })
        setTimeout(() => {
          setErrorMessage(null)
          setDisplay('none')
        }, 5000)
      })
      .catch(() => {
        setDisplay('block')
        setErrorMessage('Invalid input. please fill all form')})
    setTimeout(() => {
      setErrorMessage(null)
      setDisplay('none')
    }, 5000)
  }
  const handleLogout = async () => {
    window.localStorage.clear()
    setUser(null)
    setBlogs([])
  }

  useEffect(() => {
    const fetchData = async () => {
      const updatedBlogs = await blogService.getAll()
      updatedBlogs.sort((a,b) => b.likes - a.likes)
      setBlogs(updatedBlogs)
    }
    const loggedUserJSON = window.localStorage
      .getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      //console.log(user);
      blogService.setToken(user.token)
      fetchData()
    }
  }, [])

  return (
    <div>
      <h1>Blogs Application</h1>
      {errorMessage !== null &&
          <div style={notificationStyle}>
            <h1>{ errorMessage }</h1>
          </div>
      }
      {user === null && <LoginForm handleLogin={handleLogin} username={username} password={password} setPassword={setPassword} setUsername={setUsername} loginVisible={loginVisible} setLoginVisible={setLoginVisible}/>}
      {user !== null && <BlogForm user={user} handleLogout={handleLogout} handleCreate={handleCreate} newBlog={newBlog} setNewBlog={setNewBlog} createVisible={createVisible} setCreateVisible={setCreateVisible}/>}
      {user !== null && <BlogList blogs={blogs} setBlogs={setBlogs} user={user}/>}
    </div>
  )
}

export default App