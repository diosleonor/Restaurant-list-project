const bcrypt = require('bcryptjs')
if(process.env.NODE_ENV !== 'production'){
	require('dotenv').config()
}
// include restauranr model
const Restaurant = require('../restaurant')
const User = require('../user')
// include restaurant.json
const restaurants = require('../restaurant.json').results
const db = require('../../config/mongoose')

const USER1 = {
	name:'USER1',
	email:'user1@example.com',
	password:'12345678'
}
const USER2 = {
	name:'USER2',
	email:'user2@example.com',
	password:'12345678'
}

db.once('open', () => {
	bcrypt
		.genSalt(10)
		.then(salt => bcrypt.hash(USER1.password, salt))
		.then(hash => User.create({
			name: USER1.name,
			email: USER1.email,
			password: hash
		}))
		.then(user => {
			const userId = user._id
			const user1Restaurants = restaurants.slice(0,3)
			return Promise.all(Array.from(
				user1Restaurants,
				(_, i) => Restaurant.create({
					name: user1Restaurants[i].name, 
					name_en: user1Restaurants[i].name_en, 
					category: user1Restaurants[i].category,	
					image: user1Restaurants[i].image, 
					location: user1Restaurants[i].location, 
					phone: user1Restaurants[i].phone,
					google_map: user1Restaurants[i].google_map, 
					rating: user1Restaurants[i].rating, 
					description: user1Restaurants[i].description,
	        		userId})
				))
		})
		.catch(error => console.log(error))

	bcrypt
		.genSalt(10)
		.then(salt => bcrypt.hash(USER2.password, salt))
		.then(hash => User.create({
			name: USER2.name,
			email: USER2.email,
			password: hash
		}))
		.then(user => {
	      const userId = user._id
	      const user2Restaurants = restaurants.slice(3, 6)
	      return Promise.all(Array.from(
	        user2Restaurants,
	        (_, i) => Restaurant.create({ 
	        	name:user2Restaurants[i].name, 
				name_en:user2Restaurants[i].name_en, 
				category:user2Restaurants[i].category,	
				image:user2Restaurants[i].image, 
				location:user2Restaurants[i].location, 
				phone:user2Restaurants[i].phone,
				google_map:user2Restaurants[i].google_map, 
				rating:user2Restaurants[i].rating, 
				description:user2Restaurants[i].description,
	        	userId })
		      ))
		    })
	    .then(() => {
	      console.log('done.')
	      process.exit()
	    })
})

// 土法煉鋼法：非同步會有問題
// db.once('open', () => {
// 	bcrypt
// 		.genSalt(10)
// 		.then(salt => bcrypt.hash(USER1.password, salt))
// 		.then(hash => User.create({
// 			name: USER1.name,
// 			email: USER1.email,
// 			password: hash
// 		}))
// 		.then(user => {
// 			const userId = user._id
// 			for(i=0;i<3;i++){
// 				const {name, name_en, category, image, location,phone,google_map,description,rating} = restaurants[i]
// 				Restaurant.create({
// 						name, 
// 						name_en, 
// 						category, 
// 						image, 
// 						location, 
// 						phone, 
// 						google_map, 
// 						rating, 
// 						description,
// 						userId
// 					})
// 			}		
// 		}).catch(error => console.log(error))

// 	bcrypt
// 		.genSalt(10)
// 		.then(salt => bcrypt.hash(USER2.password, salt))
// 		.then(hash => User.create({
// 			name: USER2.name,
// 			email: USER2.email,
// 			password: hash
// 		}))
// 		.then(user => {
// 			const userId = user._id

// 			for(i=3;i<6;i++){
// 				const {name, name_en, category, image, location,phone,google_map,description,rating} = restaurants[i]
// 				Restaurant.create({
// 						name, 
// 						name_en, 
// 						category, 
// 						image, 
// 						location, 
// 						phone, 
// 						google_map, 
// 						rating, 
// 						description,
// 						userId
// 					})
// 			}		
// 		})
// 		.then(() => {
// 			console.log('done.')
// 			process.exit()
// 		})
		
// })