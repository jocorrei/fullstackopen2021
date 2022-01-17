const config = require('./utils/config')
const express = require('express')
const app = express()
require('express-async-errors')	
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
	.then(()=> {
		logger.info('connected to MongoDB')
	})
	.catch((error) => {
		logger.error('error connecting MongoDB', error.message)
	})

app.use(cors(), express.static('build'), express.json(), middleware.requestLogger)

app.use('/api/blogs', blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app