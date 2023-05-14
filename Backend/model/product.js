const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
	{
        image: { type: String},
		name: { type: String},
		description: { type: String },
        price: { type: String},
		categories: { type: String},
		qty: { type: String},
	},
	{ collection: 'product' }
)

const model = mongoose.model('ProductSchema', ProductSchema)

module.exports = model