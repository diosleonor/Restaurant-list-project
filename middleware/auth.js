// 認證器：如果有認證就無動作繼續；無認證的話一律導向登入頁
module.exports = {
	authenticator: (req, res ,next ) => {
		if(req.isAuthenticated()){
			return next()
		}
		req.flash('warning_msg', '請先登入才能使用網站！')
		res.redirect('/users/login')
	}
}