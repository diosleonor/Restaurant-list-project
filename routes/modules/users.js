const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')

// 設定login頁面路由
router.get('/login', (req, res) => {
	return res.render('login')
})

// 取得login的表單資料並登入
router.post('/login', 
	passport.authenticate('local', {
		failureRedirect:'/users/login'
	}),
	(req, res) => {res.redirect('/')}
	)

// 設定register頁面路由
router.get('/register', (req, res) => {
	return res.render('register')
})

// 取得register的表單資料並新增到資料庫
router.post('/register', (req, res) => {
	const {name, email, password, confirmPassword} = req.body
	const errors = []
	if(!email || !password || !confirmPassword){
		errors.push({message:'信箱、密碼、確認密碼欄位為必填。'})
	}
	if(password !== confirmPassword){
		errors.push({message:'密碼與確認密碼不相符！'})
	}
	if(errors.length){
		return res.render('register', {
			errors, name, email, password, confirmPassword
		})
	}
	User.findOne({email}).then(user => {
		// 已註冊
		if(user){
			errors.push({message:'這個 Email 已經註冊過了。'})
			return res.render('register',{name,email,password,confirmPassword,errors})
		}
		// 未註冊：先把密碼加密再進資料庫建立新資料
		return bcrypt
			.genSalt(10)
			.then(salt => bcrypt.hash(password,salt))
			.then(hash => User.create({ 
				name, email, password: hash
			}))
			.then(() => res.redirect('/'))
			.catch(err => console.log(err))
	})
})


// 設定logout頁面路由
router.get('/logout', (req, res) => {
	req.logout()
	req.flash('success_msg','你已成功登出。')
	res.redirect('/users/login')
})

module.exports = router