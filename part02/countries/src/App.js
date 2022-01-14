import React, {useState, useEffect} from 'react'
import axios from 'axios'
import CountriesList from './components/CountriesList'
import SearchBar from './components/Searchbar'

const App = () => {
  
  const [allCountries, setAllCountries] = useState([])
  const [searchCountries, setSearchCountries] = useState('')


  const hook = () => {
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      setAllCountries(response.data)
    })
  }

  const handleSearchCountrie = (event) =>{
    setSearchCountries(event.target.value)
   // console.log(searchCountries);
  }

  let CountriesToShow = allCountries.filter((countries) => countries.name.common.toLowerCase().includes(searchCountries.toLowerCase()))
  //console.log(CountriesToShow);

  let keys = Object.keys(CountriesToShow)
  //console.log(keys.length);

  const handleButton = (countrie) => {
    setSearchCountries(countrie)
    //console.log(countrie);
  }

  useEffect(hook, [])

  return (
  <div>
    <SearchBar value={searchCountries} onChange={handleSearchCountrie}/>
    <CountriesList countriesToShow={CountriesToShow} numberOfIndex={keys.length} handler={handleButton}/>
  </div>
  )
}
export default App;