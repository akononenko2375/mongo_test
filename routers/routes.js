const router = require('express').Router();
const {ObjectId} = require('mongodb');

const init = (client) => {

	const collectionPosts = client.db("postsdb").collection("posts");

	router.get('/', (req, res) => {
		collectionPosts.find().sort({up: -1}).toArray((err, posts) => {
			res.render('index', {
				title: 'Home Page',
				posts: posts
			})
		})
	})

	router.get('/create', (req, res) => {
		res.render('create', {
			title: 'Create page'
		})
	})

	router.post('/form', (req, res) => {

		const {title, text} = req.body
		const time = Date.now();
		const up = time;
		collectionPosts.insertOne({ title, text, time, up})
		res.redirect('/')

	})

	router.get('/delete/:id', (req, res) => {
		const id = req.params.id
		collectionPosts.findOneAndDelete({_id: ObjectId(id)}, function (err, user) {})
		res.redirect('/')
	})

	router.get('/up/:id', (req, res) => {
		const id = req.params.id
		const now = Date.now();

		collectionPosts.findOne({_id: ObjectId(id)}, (err, post) => {
			const lastTime = post.up;

			if (now - lastTime >= 60 * 1000) {
				collectionPosts.findOneAndUpdate({_id: ObjectId(id)}, {$set: {up: Date.now()}})
				res.redirect('/')
			} else {
				res.send('Error')
			}
		})
	})
}

module.exports = {
	router,
	init
}