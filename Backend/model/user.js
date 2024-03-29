const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
	{
        name: { type: String, required: true },
		username: { type: String, required: true, unique: true },
		password: { type: String, required: true },
        role: { type: String, default: 'USER' }
	},
	{ collection: 'users' }
)

const model = mongoose.model('UserSchema', UserSchema)

module.exports = model