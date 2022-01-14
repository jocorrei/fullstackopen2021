import React from 'react'

const SearchBar = ({onChange, value}) => {
	return(
	<form onChange={onChange}>
		<div>
			find countrie: <input value={value} onChange={onChange}/>
		</div>
	</form>
	)
}

export default SearchBar