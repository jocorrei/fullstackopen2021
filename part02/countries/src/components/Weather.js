import React, {useState ,useEffect} from 'react'
import axios from 'axios'

const Weather = ({city}) => {

	const [cityWeather, setCityWeather] = useState({})
	const [loading, setLoading] = useState(true)

	const apiKey = process.env.REACT_APP_API_KEY

	const hook = () => {
		axios.get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`).then(response => {
				setCityWeather(response.data);
				setLoading(false)
			})
	}

	useEffect(hook, [])

	console.log(apiKey);
	console.log(cityWeather);

	if (!loading) {
		return(
			<div>
			<h2>Weather in {city}</h2>
			<p>temperature: {cityWeather.current.temperature} Celsius</p>
			<img src={cityWeather.current.weather_icons[0]}></img>
			<p>wind: {cityWeather.current.wind_speed} mph direction {cityWeather.current.wind_dir}</p>
			</div>
		)
	}
	else
		return(null)
}


export default Weather