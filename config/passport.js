const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
module.exports = app =>{
	// 初始化設定
	app.use(passport.initialize())
	app.use(passport.session())
	// 本地登入策略設定
	passport.use(new LocalStrategy({usernameField:'email'},(email, password, done)=>{
		User.findOne({email})
			.then(user => {
				if(!user) return done(null, false, {message:'That email is not registered!'})
				if(user.password !== password) return done(null, false, {message:'Email or Password incorrect.'})
				return done(null, user)
			})
			.catch(err => done(err, false))
	}))
	// 序列及反序列化設定
	passport.serializeUser((user, done) => done(null, user.id))
	passport.deserializeUser((id, done) => {
		User.findById(id)
			.lean()
			.then(user => done(null, user))
			.catch(err => done(err, null))
	})
}