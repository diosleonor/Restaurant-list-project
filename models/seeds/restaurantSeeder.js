// include restauranr model
const Restaurant = require('../restaurant')
// include restaurant.json
const restaurants = require('../restaurant.json')
const db = require('../../config/mongoose')

db.once('open', () => {
	for(let i = 0; i < 8; i++){
		Restaurant.create(restaurants.results[i])
	}
	console.log('Done.')
})
