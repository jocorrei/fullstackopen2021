import React from 'react'


const Anecdote = (props) => {
	return (
	  <div>
		<h1>Anecdote of the day</h1>
		<p>{props.anecdote}</p>
		<p>has {props.votes } votes</p>
	  </div>
	)
  }

export default Anecdote