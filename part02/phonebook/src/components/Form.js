import React from 'react'

const Form = ({onSubmit, newName, newNumber, onNameChange, onNumberChange}) => {
	return(
	<div>
	<div><h2>Add a new</h2></div>
	<form onSubmit={onSubmit} >
		<div>
			Name: <input value={newName} onChange={onNameChange}/>
		</div>
		<div>
			Number: <input value={newNumber} onChange={onNumberChange}/>
		</div>
		<div>
			<button type="submit">add</button>
		</div>
	</form>
	</div>
	)
}

export default Form