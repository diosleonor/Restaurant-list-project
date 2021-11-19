const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// 設定index頁面路由
router.get('/', (req,res) => {
	Restaurant.find()
	.lean()
	.sort({_id: 'asc'})
	.then(restaurants => res.render('index', { restaurants }))
	.catch(error => console.log(error))
})

//搜尋功能:
router.get('/search',(req, res) => {
	const keyword = req.query.keyword.toLowerCase().trim()
 	const [property, sortBy] = req.query.sort.split('_')
 	const sortInput = req.query.sort
	Restaurant.find()
		.lean()
		.sort({[property]: sortBy})
		.then(restaurants => {
       		restaurants = restaurants.filter(restaurant => {
         		return restaurant.name.toLowerCase().includes(keyword) || restaurant.name_en.toLowerCase().includes(keyword) || restaurant.category.toLowerCase().includes(keyword)
       	})
       	res.render('index', { restaurants, keyword, property, sortBy, sortInput})
     })
		.catch(error => console.log(error))
})
module.exports = router