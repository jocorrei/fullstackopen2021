const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Blogs = require('../models/blog')


blogRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
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
	
	const user = request.user
	const blog = await Blog.findById(request.params.id)

	if (blog.user.toString() === user._id.toString()) {
		await Blog.findByIdAndDelete(request.params.id)
		response.status(200).end()
	} else {
		response.status(401).send({ error : 'User doesnt have the rights (not the owner of the blog)' })
	}
})

blogRouter.post('/', async (request, response) => {

	if (!request.body.title && !request.body.url) {
		return response.status(400).send({ error : 'missing content' })
	}

  	const user = request.user
	
	const blog =  new Blog({
		title: request.body.title,
		author: request.body.author,
		url: request.body.url,
		likes: request.body.likes,
		user: user._id
	})
	if (!blog.likes) {
		blog.likes = 0;
	}
	const savedBlog = await blog.save()
	//console.log(savedBlog);
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()
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