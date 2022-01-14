import React, { useState } from 'react'

const Header = () => {
  return(
    <h1>Give your feedback</h1>
  )
}

const Button = ({onClick, text}) => {
  return(
    <button onClick={onClick}>{text}</button>
  )
}

const StatisticLine = ({text, value}) => {
  return(
    <tr><td>{text}: {value}</td></tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  
  const total = good + bad + neutral
  const average = (good + bad*(-1))/total
  const positive = (good/total)*100
  
  if (total === 0) {
    return(<div>
      <h1>No feedback given</h1>
    </div>)
  }
  else {
    return(<div>
      <h1>Statistics</h1>
      <table>
      <tbody>
        <StatisticLine text='Good' value={good}/>
        <StatisticLine text='Neutral' value={neutral}/>
        <StatisticLine text='Bad' value={bad}/>
        <StatisticLine text='Total' value={total}/>
        <StatisticLine text='Average' value={average.toFixed(1)}/>
        <StatisticLine text='Positive' value={positive.toFixed(1) + '%'}/>
      </tbody>
      </table>
    </div>)
  }
}
 
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () =>{
    setGood(good + 1)
  }

  const handleBadClick = () =>{
    setBad(bad + 1)
  }

  const handleNeutralClick = () =>{
    setNeutral(neutral + 1)
  }

  return (
    <div>
      <Header />
      <Button onClick={handleGoodClick} text='good'/>
      <Button onClick={handleNeutralClick} text='neutral'/>
      <Button onClick={handleBadClick} text='bad'/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App