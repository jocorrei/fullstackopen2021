const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
	response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
	//	console.log(request.params);
	const blog = await Blog.findById(request.params.id)
	if (blog) {
		response.json(blog)		
	} else {
		response.status(404).end()
	}	
})

blogRouter.delete('/:id', async (request, response) => {
	
	const blog = await Blog.findByIdAndDelete(request.params.id)
	if (blog) {
		response.json(blog)
	}
	else {
		response.status(404).send({ error: 'inexisting ID'})
	}
})

blogRouter.post('/', async (request, response) => {

	if (!request.body.title && !request.body.url) {
		return response.status(400).send({ error : 'missing content' })
	}
	
	const blog = await new Blog(request.body)
	if (!blog.likes) {
		blog.likes = 0;
	}
	const savedBlog = await blog.save()
	response.status(201).json(blog)
})

blogRouter.put('/:id', async (request, response, next) => {
	
	const blog = await Blog.findByIdAndUpdate(request.params.id, request.body, {
		new:true, runValidators:true
	})
	if (blog) {
		response.json(blog)
	}
	else {
		response.status(404).send({ error: 'Couldnt find entry'})
	}
})

module.exports = blogRouter