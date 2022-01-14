import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [messageColor, setMessageColor] = useState('')
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchName = (event) => {
    setSearchName(event.target.value)
  }

  const hook = () => {
    personService.getAll().then(initialPerson => {
      setPersons(initialPerson)
    })
  }

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.lenght + 1
    }
    let id = persons.find(n => n.name === nameObject.name)
    !persons.find(n => n.name === nameObject.name) ?
    personService.create(nameObject).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
      setMessageColor('green')
      setErrorMessage(
        `Contact for ${nameObject.name} sucessfully created :)`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }) : 
      (window.confirm(`${nameObject.name} is already on the list\nReplace the old number with the new one?`)
      ? personService.update(id.id, nameObject)
      .then(() => personService.getAll().then(initialPerson => {  
        setPersons(initialPerson)
        setNewName('')
        setNewNumber('')
        setMessageColor('green')
        setErrorMessage(
          `Contact for ${nameObject.name} updated`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })).catch(error => {
        setMessageColor('red')
        setErrorMessage(`${nameObject.name} was already deleted from the server, please reload browser`)
        console.log('good');
      }) 
      : (window.close()))
  }

  const deleteButton = (id) => {
    const contact = persons.find(n => n.id === id)
    const contactName = contact.name
    personService.deleteOne(id)
    .then(() =>
    personService.getAll().then(initialPerson => {
      setPersons(initialPerson)
      setMessageColor('red')
      setErrorMessage(
        `Contact for ${contactName} deleted :(`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })).catch(error => {
      setMessageColor('red')
      setErrorMessage(
        `Contact for ${contactName} was already deleted from server, please reload browser`
      )
    })
  }

  const nameToShow = persons.filter((person) => person.name.toLowerCase().includes(searchName.toLowerCase()))

  useEffect(hook, [ ])

  return (
    <div>
      <Filter value={searchName} onChange={handleSearchName}/>
      <Form onSubmit={addName} newName={newName} newNumber={newNumber} onNameChange={handleNameChange} onNumberChange={handleNumberChange}/>
      <Notification message={errorMessage} color={messageColor}/>
      <Persons nameToShow={nameToShow} deleteB={deleteButton}/>
    </div>
  )
}

export default App
