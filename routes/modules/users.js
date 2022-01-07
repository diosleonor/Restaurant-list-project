const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// 設定login頁面路由
router.get('/login', (req, res) => {
	return res.render('login')
})

// 取得login的表單資料並登入
router.post('/login', (req, res) => {
	const data = req.body
	return Restaurant.create(data)
		.then(() => res.redirect('/'))
		.catch(error => console.log(error))
})

// 設定register頁面路由
router.get('/register', (req, res) => {
	return res.render('register')
})

// 取得register的表單資料並新增到資料庫
router.post('/register', (req, res) => {
	const data = req.body
	return Restaurant.create(data)
		.then(() => res.redirect('/'))
		.catch(error => console.log(error))
})

module.exports = router