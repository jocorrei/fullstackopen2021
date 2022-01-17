const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('../utils/blog_helper')


	beforeEach(async () => {
		await Blog.deleteMany({})
		let blogObject = new Blog(helper.initialBlog[0])
		await blogObject.save()
		blogObject = new Blog(helper.initialBlog[1])
		await blogObject.save()
	})


	test('blog are returned as JSON:', async() => {
		await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
	}, 1000000)

	test('there are two blogs', async () => {
		const response = await api.get('/api/blogs')  
		expect(response.body).toHaveLength(helper.initialBlog.length)
	})

	test('unique identifier is id', async () => {
		const response = await api.get('/api/blogs')
		//console.log(response.body[0].id);

		expect(response.body[0].id).toBeDefined()
	})
	
	test('the first blog is React patterns', async () => {
		const response = await api.get('/api/blogs')
		expect(response.body[0].title).toBe(helper.initialBlog[0].title)
	})

	test('a valid blog can be added', async () => {
		
		const newBlog = {
			title: "Oliveira's blog",
			author: "Oliveira",
			url: "https://jocorrei.github.io/My-portifolio/",
			likes: 700
		}

		await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)

		const response = await api.get('/api/blogs')
		const contents = response.body.map(r => r.title)
		//console.log(contents);
		expect(contents[2]).toEqual("Oliveira's blog")
		expect(response.body).toHaveLength(helper.initialBlog.length + 1)
	})

	test('post without likes set like to 0 automatically', async() => {
		
		const newBlog = {
			title: "Oliveira's Blog",
			author: "Oliveira",
			url : "https://jocorrei.github.io/My-portifolio/",
		}

		await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)

		const response = await api.get('/api/blogs')

		//console.log(response);
		expect(response.body[2].likes).toEqual(0)
	})

	test('post without title and url should respond with status 400 BadRequest', async () => {

		const newBlog = {
			author: "Oliveira"
		}

		await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(400)

		//console.log(response);
		const response = await api.get('/api/blogs')
	})

	test('deleting a blog from the database', async () => {
		
		const blogs = await api.get('/api/blogs')
		const id = blogs.body[0].id

		await api
		.delete(`/api/blogs/${id}`)

		const response = await api.get('/api/blogs')
		expect(response.body).toHaveLength(helper.initialBlog.length - 1)
	})

	test('updating a blog from the database', async() => {

		const blogs = await api.get('/api/blogs')
		const id = blogs.body[0].id

		//console.log(blogs);

		await api
		.put(`/api/blogs/${id}`)
		.send({
			title: "João Pedro blog",
			likes: 100,
		})
		.expect(200)

		const response = await api.get('/api/blogs')
		expect(response.body[0]).toEqual({
			title: 'João Pedro blog',
			author: 'Michael Chan',
			url: 'https://reactpatterns.com/',
			likes: 100,
			id: '5a422a851b54a676234d17f7'
		  })

	})
	
	afterAll(() => {
	mongoose.connection.close()
})