const {MongoClient, ObjectId} = require('mongodb');
const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./routers/routes');
const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))
app.use(routes.router)

app.engine('hbs', exphbs({
	defaultLayout: 'main',
	extname: 'hbs'
}))
app.set('view engine', 'hbs')

const client = new MongoClient('mongodb://localhost:27017/', {
	useUnifiedTopology: true,
	useNewUrlParser: true
});


const start = async () => {
	try {
		await client.connect()
		routes.init(client)
		console.log('База подключена успешно!')

		app.listen(3000, () => {
			console.log('Saterted on PORT 3000...')
		})

	} catch (e) {
		console.log(e)
	}
}

start();

