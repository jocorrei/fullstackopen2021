import React from 'react'

const Filter = ({value, onChange}) =>{
	return(
		<div>
			<div><h2>Phonebook</h2></div>
			search : <input value={value} onChange={onChange}/>
		</div>
	)
}

export default Filter