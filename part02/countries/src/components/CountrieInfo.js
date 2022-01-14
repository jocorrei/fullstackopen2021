import React from 'react'
import Languages from './Languages'
import Weather from './Weather'

const CountrieInfo = ({countrie}) => {
	let langArray = Object.entries(countrie[0].languages)
	let imgSource = Object.entries(countrie[0].flags)

	return(
		<div>
			<h1>{countrie[0].name.common}</h1>
			<p>capital: {countrie[0].capital}</p>
			<p>population: {countrie[0].population}</p>
			<h2>languages</h2>
			<ul>
				{langArray.map(language => 
					<Languages key={language[1]} lang={language[1]}/>)}
			</ul>
			<img src={imgSource[0][1]} style={{width: 100}}></img>
			<Weather city={countrie[0].capital}/>
		</div>
	)
}

export default CountrieInfo