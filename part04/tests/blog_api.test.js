const mongoose = require('mongoose')
const { post } = require('superagent')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('../utils/blog_helper')
let token = null

	beforeAll(async () => {
		const logIn = await api.post('/api/login').send({ username: 'exkizoroot', password: 'password'})
		token = logIn.body.token
	})

	beforeEach(async () => {
		await Blog.deleteMany({})
		const user = await api.get('/api/users')
		const userId = user.body[0].id
		//console.log(typeof userId);
		let blogObject = new Blog({
			_id: '5a422a851b54a676234d17f7',
			title: 'React patterns',
			author: 'Michael Chan',
			url: 'https://reactpatterns.com/',
			likes: 32,
			__v: 0,
			user: userId
		})
		await blogObject.save()
		blogObject = new Blog({
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 5,
			__v: 0,
			user: userId,
		})
		await blogObject.save()
	})

	test('blog are returned as JSON:', async() => {
		await api
		.get('/api/blogs')
		.auth(token, {type: 'bearer'})
		.expect(200)
		.expect('Content-Type', /application\/json/)
	}, 1000000)

	test('there are two blogs', async () => {
		const response = await api
		.get('/api/blogs')
		.auth(token, {type: 'bearer'})  
		expect(response.body).toHaveLength(helper.initialBlog.length)
	})

	test('unique identifier is id', async () => {
		const response = await api
		.get('/api/blogs')
		.auth(token, {type: 'bearer'})
		//console.log(response.body[0]);

		expect(response.body[0].id).toBeDefined()
	})
	
	test('the first blog is React patterns', async () => {
		const response = await api
		.get('/api/blogs')
		.auth(token, {type: 'bearer'})
		expect(response.body[0].title).toBe(helper.initialBlog[0].title)
	})

	test('cannot creat a blog post without being logged in', async () => {

		const user = await api.get('/api/users')
		const userId = user.body[0].id
		
		const newBlog = {
			title: "Oliveira's blog",
			author: "Oliveira",
			url: "https://jocorrei.github.io/My-portifolio/",
			likes: 700,
			user: userId,
		}

		await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(401)

		const response = await api.get('/api/blogs')
		.auth(token, {type: 'bearer'})
		expect(response.body).toHaveLength(helper.initialBlog.length)
		
	})

	test('a valid blog can be added with a user logged in', async () => {

		const logIn = await api.post('/api/login').send({ username: 'exkizoroot', password: 'password'})
		token = logIn.body.token
		const userId = logIn.body.id 
		
		const newBlog = {
			title: "Oliveira's blog",
			author: "Oliveira",
			url: "https://jocorrei.github.io/My-portifolio/",
			likes: 700,
			user: userId,
		}

		await api
		.post('/api/blogs')
		.auth(token, {type: 'bearer'})
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)

		const response = await api.get('/api/blogs')
		.auth(token, {type: 'bearer'})
		const contents = response.body.map(r => r.title)
		//console.log(contents);
		expect(contents[2]).toEqual("Oliveira's blog")
		expect(response.body).toHaveLength(helper.initialBlog.length + 1)
	})

	test('post without likes set like to 0 automatically', async() => {
		
		const logIn = await api.post('/api/login').send({ username: 'exkizoroot', password: 'password'})
		token = logIn.body.token
		userId = logIn.body.id
		
		const newBlog = {
			title: "Oliveira's Blog",
			author: "Oliveira",
			url : "https://jocorrei.github.io/My-portifolio/",
			user: userId,
		}

		await api
		.post('/api/blogs')
		.auth(token, {type: 'bearer'})
		.send(newBlog)
		.expect(201)

		const response = await api.get('/api/blogs')
		.auth(token, {type: 'bearer'})

		//console.log(response);
		expect(response.body[2].likes).toEqual(0)
	})

	test('post without title and url should respond with status 400 BadRequest', async () => {

		const newBlog = {
			author: "Oliveira"
		}

		await api
		.post('/api/blogs')
		.auth(token, {type: 'bearer'})
		.send(newBlog)
		.expect(400)

		//console.log(response);
		const response = await api.get('/api/blogs')
		.auth(token, {type: 'bearer'})
	})

	test('deleting blog from the database with token authenticated', async () => {
		
		const logIn = await api.post('/api/login').send({ username: 'exkizoroot', password: 'password'})
		token = logIn.body.token
		const blogs = await api.get('/api/blogs')
		.auth(token, {type: 'bearer'})
		const id = blogs.body[0].id

		await api.delete(`/api/blogs/${id}`)
		.auth(token, {type: 'bearer'})
		.expect(200)

		const response = await api.get('/api/blogs')
		.auth(token, {type: 'bearer'})
		//console.log(response.body, 'here2');
		expect(response.body).toHaveLength(helper.initialBlog.length - 1)
	})

	test('deleting blog from database with token authenticated but without user privilegs', async () => {
		
		await api.post('/api/users').send({blogs: [], username: "newTestUser", name:"testUser", password:"password"})
		const logIn = await api.post('/api/login').send({ username: 'newTestUser', password: 'password'})
		token = logIn.body.token

		const blogs = await api.get('/api/blogs')
		.auth(token, {type: 'bearer'})
		const id = blogs.body[0].id
		
		await api.delete(`/api/blogs/${id}`)
		.auth(token, {type: 'bearer'})
		.expect(401)

		const response = await api.get('/api/blogs')
		.auth(token, {type: 'bearer'})
		expect(response.body).toHaveLength(helper.initialBlog.length)
	})
	

	test('updating a blog from the database', async() => {

		const blogs = await api.get('/api/blogs')
		.auth(token, {type: 'bearer'})
		const id = blogs.body[0].id
		const user = await api.get('/api/users')
		.auth(token, {type: 'bearer'})
		const userId = user.body[0].id

		//console.log(blogs);

		await api
		.put(`/api/blogs/${id}`)
		.auth(token, {type: 'bearer'})
		.send({
			title: "João Pedro blog",
			likes: 100,
		})
		.expect(200)

		const response = await api.get('/api/blogs')
		.auth(token, {type: 'bearer'})
		expect(response.body[0]).toEqual({
			title: 'João Pedro blog',
			author: 'Michael Chan',
			url: 'https://reactpatterns.com/',
			likes: 100,
			id: '5a422a851b54a676234d17f7',
			user: {
				id: userId,
				name: 'Exkizo',
				username: 'exkizoroot'
			}
		  })

	})
	
	afterAll(() => {
	mongoose.connection.close()
})