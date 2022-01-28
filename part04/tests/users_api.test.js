const { response } = require('express')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const Blog = require('../models/blog')
let token = null

beforeAll(async () => {
	await User.deleteMany({})
	await Blog.deleteMany({})
})

test('Creating new user with invalid username and password', async () => {
	
	const newUser = {
		username: 'f',
		name: 'testing',
		password: 'su',
	}

	await api
	.post('/api/users')
	.send(newUser)
	.expect(400)

	//console.log(message.body);
})

test('Creating a new user', async () => {
	
	const newUser = {
		username: 'exkizoroot',
		name: 'Exkizo',
		password: 'password',
	}

	await api.post('/api/users')
	.send(newUser)
	.expect(200)

	let response = await api.get('/api/users')
	//console.log(response.body);
	expect(response.body).toHaveLength(1)
})


test('Creating new blog should add the blog into the users list', async () => {

	const logIn = await api.post('/api/login').send({ username: 'exkizoroot', password: 'password' })
	
	token = logIn.body.token
	const initialBlogs = await api
	.get('/api/blogs')
	.auth(token, {type: 'bearer'})
	const len = initialBlogs.body.length
	//console.log(len);
	const userId = logIn.body.id

	const newBlog = {
		title: 'Testing blog',
		author: 'testing author',
		url: "https://jocorrei.github.io/My-portifolio/",
		likes: 199,
		user: userId,
	}

	await api
	.post('/api/blogs')
	.auth(token, {type: 'bearer'})
	.send(newBlog)
	.expect(201)

	const finalBlogs = await api
	.get('/api/blogs')
	.auth(token, {type: 'bearer'})
	expect(finalBlogs.body).toHaveLength(len + 1)

	const response = await api
	.get('/api/users')
	
	const userList = response.body
	const blogAdded = userList[userList.length - 1]

	//console.log(blogAdded.blogs[blogAdded.blogs.length - 1].title);
	expect(blogAdded.blogs[blogAdded.blogs.length - 1].title).toBe('Testing blog')

})

afterAll (() => {
	mongoose.connection.close()
})