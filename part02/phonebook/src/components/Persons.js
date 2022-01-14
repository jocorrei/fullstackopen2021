import React from 'react'

const Persons = ({nameToShow, deleteB}) => {
	return(
		<div>
		<div><h2>Contacts</h2></div>
		<ul>
		{nameToShow.map(person =>
          <li key={person.id}>
			  {person.name} {person.number}
			  <button onClick={() => window.confirm(`Delete ${person.name} from contact list?`) ? deleteB(person.id) :(null)}>delete</button>
			  </li>)}
		</ul>
		</div>
	)
}

export default Persons