// include mongoose to use
const mongoose = require('mongoose')

// include restauranr model
const Restaurant = require('../restaurant')

// use mongoose to connect web server and database
mongoose.connect('mongodb://localhost/restaurant-list')
const db = mongoose.connection
db.on('error', () => {
	console.log('Mongodb error!')
})
db.once('open', () => {
	console.log('Mongodb connected.')
	for(let i = 0; i < 8; i++){
		Restaurant.create({name: 'name-' + i})
	}
	console.log('Done.')
})