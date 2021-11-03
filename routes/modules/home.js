const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// 設定index頁面路由
router.get('/', (req,res) => {
	Restaurant.find()
	.lean()
	.sort({_id: 'desc'})
	.then(restaurants => res.render('index', { restaurants }))
	.catch(error => console.log(error))
})

module.exports = router