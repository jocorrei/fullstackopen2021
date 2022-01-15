const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response) => {
	Blog.find({}).then(blogs => {
		response.json(blogs)
	})
})

blogRouter.get('/:id', (request, response) => {
//	console.log(request.params);
	Blog
	.findById(request.params.id)
	.then(resp => {
		response.json(resp)
	})
})

blogRouter.delete('/:id', (request, response) => {
	Blog
	.findByIdAndDelete(request.params.id)
	.then(resp => {
		if (resp) {
			response.json(resp)
		}
		else {
			response.status(404).send({error: 'inexisting ID'})
		}
	})
})

blogRouter.post('/', (request, response) => {
	const blog = new Blog(request.body)

	blog.save().then(result => {
		response.status(201).json(result)
	})
})

blogRouter.put('/:id', (request, response, next) => {
	
	console.log(request.body);

	Blog.findByIdAndUpdate(request.params.id, request.body, {
		new:true, runValidators:true
	})
	.then(resp => {
		if (resp) {
			response.json(resp)
		}
		else {
			response.status(404).send({error: 'Couldnt find entry'})
		}
	})
})

module.exports = blogRouter