import React, { useState, useEffect } from 'react'
import Anecdote from './components/Anecdote'
import Button from './components/Button'
import Votebutton from './components/Votebutton'
import DisplayMostVoted from './components/DisplayMostVoted'


const App = () => {
  const anecdotes = [
    'Premature optimization is the root of all evil.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'If it hurts, do it more often.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const Votes = Array(anecdotes.length).fill(0)

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Votes)
  const [mostVoted, setMostVoted] = useState(0)

  //console.log(votes)

  const updateVote = () => {
    let updatedVotes = [... votes]
    updatedVotes[selected]++
    setVotes(updatedVotes)
  }

  const handleNextCick = () => {
    setSelected(Math.floor(Math.random()*7))
  }

  useEffect(() => {
    const anecdote = votes.indexOf(Math.max(...votes));
    if (votes[anecdote] <= votes[mostVoted]) {
      return;
    }
    setMostVoted(anecdote);
  }, [votes, mostVoted]);

  return (
    <div>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]}/>
      <Button onClick={handleNextCick} />
      <Votebutton onClick={updateVote}/>
      <DisplayMostVoted votes={anecdotes[mostVoted]} voted={votes[mostVoted]}/>
    </div>
  )
}

export default App
