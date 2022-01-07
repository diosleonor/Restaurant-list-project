const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')
const User = require('../../models/user')
const passport = require('passport')

// 設定login頁面路由
router.get('/login', (req, res) => {
	return res.render('login')
})

// 取得login的表單資料並登入
router.post('/login', passport.authenticate('local', {
	successRedirect:'/',
	failureRedirect:'/users/login'
}))

// 設定register頁面路由
router.get('/register', (req, res) => {
	return res.render('register')
})

// 取得register的表單資料並新增到資料庫
router.post('/register', (req, res) => {
	const {name, email, password, confirmPassword} = req.body
	User.findOne({email})
		.then(user => {
			if(user){
				console.log('User already exists.')
				res.render('register',{
					name,
					email,
					password,
					confirmPassword
				})
			} else {
				return User.create({
					name,
					email,
					password,
				})
				.then(() => res.redirect('/'))
				.catch(err => console.log(err))
			}
		})
})

// 設定logout頁面路由
router.get('/logout', (req, res) => {
	req.logout()
	res.redirect('/users/login')
})

module.exports = router