const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// 設定new頁面路由
router.get('/new', (req, res) => {
	return res.render('new')
})

// 取得new的表單資料並新增到資料庫
router.post('/', (req, res) => {
	const data = req.body
	return Restaurant.create(data)
		.then(() => res.redirect('/'))
		.catch(error => console.log(error))
})

// 設定detail頁面路由:應用 params 打造動態路由
router.get('/:restaurant_id', (req, res) => {
	const id = req.params.restaurant_id
	return Restaurant.findById(id)
		.lean()
		.then(restaurant => res.render('detail', { restaurant }))
		.catch(error => console.log(error))
})

// 設定edit頁面路由:同detail頁面
router.get('/:restaurant_id/edit', (req, res) => {
	const id = req.params.restaurant_id
	return Restaurant.findById(id)
		.lean()
		.then(restaurant => res.render('edit', { restaurant }))
		.catch(error => console.log(error))
})

// 取得edit的表單資料並修改到資料庫
router.put('/:restaurant_id', (req, res) => {
	const id = req.params.restaurant_id
	return Restaurant.findById(id)
		.then(restaurant => {
			restaurant = Object.assign(restaurant, req.body)
			return restaurant.save()
		})
		.then(() => res.redirect(`/restaurants/${id}`))
		.catch(error => console.log(error))
})

//設定delete路由:
router.delete('/:restaurant_id', (req, res) => {
	const id = req.params.restaurant_id
	return Restaurant.findById(id)
		.then(restaurant => restaurant.remove())
		.then(() => res.redirect('/'))
		.catch(error => console.log(error))
})



module.exports = router