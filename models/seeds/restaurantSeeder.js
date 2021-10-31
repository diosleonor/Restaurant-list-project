// include mongoose to use
const mongoose = require('mongoose')

// include restauranr model
const Restaurant = require('../restaurant')

// include restaurant.json
const restaurants = require('../restaurant.json')

// use mongoose to connect web server and database
mongoose.connect('mongodb://localhost/restaurant-list')
const db = mongoose.connection
db.on('error', () => {
	console.log('Mongodb error!')
})
db.once('open', () => {
	console.log('Mongodb connected.')
	for(let i = 0; i < 8; i++){
		Restaurant.create(restaurants.results[i])
	}
	console.log('Done.')
})
