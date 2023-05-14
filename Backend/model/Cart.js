const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema(
	{
        productId: { type: String},
        userId: { type: String},
		qty: { type: String},
	},
	{ collection: 'cart' }
)

const model = mongoose.model('cartSchema', cartSchema)

module.exports = model