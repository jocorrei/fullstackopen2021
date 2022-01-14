import React from 'react'

const Header = ({course}) => {
  return(
    <h1>{course.name}</h1>
  )
}

const Part = ({part, exercise}) => {
  return(
    <p>{part} {exercise}</p>
    )
}

const Content = ({content}) => {
  return(
  <>
  <Part part={content[0].name} exercise={content[0].exercises}/>
  <Part part={content[1].name} exercise={content[1].exercises}/>
  <Part part={content[2].name} exercise={content[2].exercises}/>
  </>
  )
}

const Total = ({parts}) => {
  return(
  <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
  )
}

const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course}/>
      <Content content={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App