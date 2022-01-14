import React from 'react'

const Notification = ({message, color}) => {

	const notificationlAddStyle = {
		color: color,
		background: 'lightgrey',
		fontSize: 20,
		borderStyle: 'solid',
		borderRadius: 5,
		padding: 10,
		marginBotton: 10,
		marginTop: 10
	}
	if (message === null) {
		return null
	}
	else {
		return(
		<div style={notificationlAddStyle}>
			<p>{message}</p>
		</div>)
	}
}

export default Notification