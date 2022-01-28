const mongoose = require('mongoose')
const uniqueValidatior = require('mongoose-unique-validator')

const	userSchemma = new mongoose.Schema({
	username: {
		type: String,
		unique: true
	},
	name: String,
	passwordHash: String,
	blogs: [
		{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Blog'
	}
],
})

userSchemma.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v

		//password hash should not be revealed

		delete returnedObject.passwordHash
	}
})

userSchemma.plugin(uniqueValidatior)

const User = mongoose.model('User', userSchemma)

module.exports = User