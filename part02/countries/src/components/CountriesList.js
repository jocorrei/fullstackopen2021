import CountrieInfo from './CountrieInfo'

const CountriesList = ({countriesToShow, numberOfIndex, handler}) => {

	//console.log(countriesToShow);


	if (numberOfIndex > 1 && numberOfIndex <= 10) {
		return (
			<div>
				<ul>
					{countriesToShow.map(countrie =>
						<li key={countrie.name.common}>{countrie.name.common} 
						<button onClick={() => handler(countrie.name.common)} style={{margin:10}}>show</button>	
						</li>
						)}
				</ul>
			</div>
		)
	}
	else if (numberOfIndex > 10) {
		return(
			<div>
				<p>Too many matches, specify another filter</p>
			</div>
		)
	}
	else if (numberOfIndex === 0) {
		return(
			<div>Search for a Countrie</div>
		)
	}
	else {
		return(<CountrieInfo countrie={countriesToShow}/>)
	}
}

export default CountriesList