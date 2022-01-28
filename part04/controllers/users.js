const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
	const users = await User.find({}).populate('blogs', {title: 1, id: 1})
	response.json(users)
})

usersRouter.post('/', async (request, response) => {
	const body = request.body

//	console.log(body.name.length);

	if (body.username.length < 3 || body.password.length < 3) {
		return response.status(400).send({error: 'invalid input. username and pass needs len > 3'})
	}
	const saltRounds = 10
	const passwordHash = await bcrypt.hash(body.password, saltRounds)

	const user = new User({
		username: body.username,
		name: body.name,
		passwordHash,
	})

	const savedUser = await user.save()
	response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
	const users = await User.find({})
	response.json(users)
})

module.exports = usersRouter