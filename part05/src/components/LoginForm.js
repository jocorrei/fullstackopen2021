import React from 'react'

const LoginForm = ({handleLogin, username, password, setPassword, setUsername, loginVisible, setLoginVisible}) => {
	const showWhenVisible = {display: loginVisible ? 'none': ''}
	const hideWhenVisible = {display: loginVisible ? '' : 'none'}
	
	return (
	<div>
		<div style={hideWhenVisible}>
			<button onClick={() => setLoginVisible(false)}>login</button>
		</div>
		<div style={showWhenVisible}>
			<h1>Log in to application</h1>
      		<form onSubmit={handleLogin}> 
        <div>
          username:
          <input type="text"
          value={username}
          name="Username"
          onChange= {({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password:
          <input type="text"
          value={password}
          name='Password'
          onChange={({target}) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
	  <button onClick={() => setLoginVisible(true)}>cancel</button>
	  </div>
    </div>
	)

}

export default LoginForm