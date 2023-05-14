/* eslint-disable no-undef */
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./model/user')
const Product = require('./model/product')
const Cart = require('./model/Cart')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cors = require('cors');

const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'

mongoose.connect('mongodb://0.0.0.0:27017/ecommerce', {
	useUnifiedTopology:true, useNewUrlParser: true
}).then(() => {
    console.log('DataBase is connected succsessfully')
})

const app = express()
app.use('/', express.static(path.join(__dirname, 'static')))
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());
app.use(cors({
    origin: '*'
}));

app.post('/api/change-password', async (req, res) => {
	const { token, newpassword: plainTextPassword } = req.body

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		})
	}

	try {
		const user = jwt.verify(token, JWT_SECRET)

		const _id = user.id

		const password = await bcrypt.hash(plainTextPassword, 10)

		await User.updateOne(
			{ _id },
			{
				$set: { password }
			}
		)
		res.json({ status: 'ok' })
	} catch (error) {
		res.json({ status: 'error', error: ';))' })
	}
})

app.post('/api/login', async (req, res) => {
	const { username, password } = req.body
	const user = await User.findOne({ username }).lean()

	if (!user) {
		return res.json({ status: 'error', error: 'Invalid username/password' })
	}

	if (await bcrypt.compare(password, user.password)) {
		const token = jwt.sign(
			{
				id: user._id,
				username: user.username,
				role: user.role,
				name: user.name
			},
			JWT_SECRET
		)

		return res.json({ status: 'ok', data: token })
	}

	res.json({ status: 'error', error: 'Invalid username/password' })
})

app.post('/api/register', async (req, res) => {
	const {name, username, password: plainTextPassword, role } = req.body

	if (!username || typeof username !== 'string') {
		return res.json({ status: 'error', error: 'Invalid username' })
	}

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		})
	}

	const password = await bcrypt.hash(plainTextPassword, 10)

	try {
		const response = await User.create({
            name,
			username,
			password,
            role
		})
	} catch (error) {
		if (error.code === 11000) {
			return res.json({ status: 'error', error: 'Username already in use' })
		}
		throw error
	}

	res.json({ status: 'ok' })
})

app.post('/api/create-product', async (req, res) => {
	const {image, name, description, price, qty, categories } = req.body

	try {
		const response = await Product.create({
            image, name, description, price, qty, categories
		})
	} catch (error) {
		if (error.code === 11000) {
			return res.json({ status: 'error', error: 'somthing went wrong' })
		}
		throw error
	}

	res.json({ status: 'ok' })
})

app.delete('/api/delete-product', async (req, res) => {
	const productId  = req.query.productId

	try {
		const response = await Product.deleteOne({
            _id: productId
		})
	} catch (error) {
		if (error.code === 11000) {
			return res.json({ status: 'error', error: 'somthing went wrong' })
		}
		throw error
	}

	res.json({ status: 'ok' })
})

app.put('/api/edit-product', async (req, res) => {
	// const productId  = req.params.productId
	const {categories, description,name,price,qty,_id}  = req.body

	try {
		const response = await Product.updateOne(
			{_id },
			{
				$set: { categories, description, name, price, qty }
			}
		)
	} catch (error) {
		if (error.code === 11000) {
			return res.json({ status: 'error', error: 'somthing went wrong' })
		}
		throw error
	}

	res.json({ status: 'ok' })
})

app.get('/api/products', async (req, res) => {
	const products = await Product.find({})
	res.json(products)
})

app.get('/api/getproductscategory/:categories', async (req, res) => {
	const categories = req.params.categories
	const products = await Product.find({categories})
	res.json(products)
})

app.post('/api/add-to-cart', async (req, res) => {
	const {productId, qty, userId } = req.body

	try {
		const response = await Cart.create({
            productId, qty, userId
		})
	} catch (error) {
		if (error.code === 11000) {
			return res.json({ status: 'error', error: 'somthing went wrong' })
		}
		throw error
	}

	res.json({ status: 'ok'})
})

app.delete('/api/remove-cart', async (req, res) => {
	const cartId  = req.query.cartId

	try {
		const response = await Product.deleteOne({
            _id: cartId
		})
	} catch (error) {
		if (error.code === 11000) {
			return res.json({ status: 'error', error: 'somthing went wrong' })
		}
		throw error
	}

	res.json({ status: 'ok' })
})

app.get('/api/get-cart/:userId', async (req, res) => {
	const userId = req.params.userId
	const CartItem = await Cart.find({userId})
	  res.json(CartItem)
})

app.listen(9999, () => {
	console.log('Server up at 9999')
})