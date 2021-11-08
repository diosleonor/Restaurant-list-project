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
	// 以下新增
 	const sortItem = req.query.sort
   	const sortMethod = {}
  	let sortInput
	   switch (sortItem) {
	     case 'name_asc':
	       sortMethod['name'] = 'asc'
	       sortInput = `A > Z`
	       break
	     case 'name_desc':
	       sortMethod['name'] = 'desc'
	       sortInput = 'Z > A'
	       break
	     case 'rating_desc':
	       sortMethod['rating'] = 'desc'
	       sortInput = '評分最高'
	       break
	     case 'category':
	       sortMethod['category'] = 'asc'
	       sortInput = '類別'
	       break
	     case 'location':
	       sortMethod['location'] = 'asc'
	       sortInput = '地區'
	       break
	     default:
	       sortMethod['_id'] = 'asc'
	   }
	// 新增結束
	Restaurant.find()
		.lean()
		// 新增
		.sort(sortMethod)
		// 新增結束
		.then(restaurants => {
       		restaurants = restaurants.filter(restaurant => {
         		return restaurant.name.toLowerCase().includes(keyword) || restaurant.name_en.toLowerCase().includes(keyword) || restaurant.category.toLowerCase().includes(keyword)
       	})
       	res.render('index', { restaurants, keyword, sortInput })
     })
		.catch(error => console.log(error))
})
module.exports = router