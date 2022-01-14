import React from 'react'

const DisplayMostVoted = (props) => {
	return(
	  <div>
		<h1>Anecdote with most votes</h1>
		<p>{props.votes}</p>
		<p>has {props.voted} votes</p>
	  </div>
	)
}

export default DisplayMostVoted