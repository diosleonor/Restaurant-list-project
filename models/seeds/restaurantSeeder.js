// include restauranr model
const Restaurant = require('../restaurant')
// include restaurant.json
const restaurants = require('../restaurant.json').results
const db = require('../../config/mongoose')

db.once('open', () => {
	Restaurant.create(restaurants)
	console.log('Done.')
})
