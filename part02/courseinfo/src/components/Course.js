import React from "react";

const Header = ({name}) => {
	return(
		<h1>{name}</h1>
	)
}

const Part = ({name, exercises}) => {
	return(
		<p>{name} {exercises}</p>
	)
}

const Content = ({parts}) => {

	return(
		<div>
			{parts.map(part =>
				<Part name={part.name} exercises={part.exercises} key={part.id} />
			)}
		</div>
	)

}

const Total = ({parts}) => {
	const total = parts.reduce((acc, value) => acc + value.exercises,0);
	
	return(
		<div>
			<p>
				<strong>Total exercises {total}</strong>
			</p>
		</div>
	)
}

const Course = ({course}) => {
	
	return(
		<div>
		<Header name={course.name}/>
		<Content parts={course.parts}/>
		<Total parts={course.parts}/>	
		</div>
	)
}

export default Course