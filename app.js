// 定義所需變數
const express = require('express')
const session = require('express-session')
const app = express()
const exphbs = require('express-handlebars')
const hbshelpers = require('handlebars-helpers')
const multihelpers = hbshelpers()
const Restaurant = require('./models/restaurant')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')
// 環境設定必須在port之前
if(process.env.NODE_ENV !== 'production'){
	require('dotenv').config()
}
const port = process.env.PORT
const routes = require('./routes')
const usePassport = require('./config/passport')
require('./config/mongoose')
// view engine set as handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main', helpers:'multihelpers'}))
app.set('view engine', 'handlebars')

// use the static document including stylesheet
app.use(express.static('public'))

app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true
}))
// process all data by bodyParser before routing
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

usePassport(app)
app.use(flash())
app.use((req, res, next) => {
	res.locals.isAuthenticated = req.isAuthenticated()
	res.locals.user = req.user
	res.locals.success_msg = req.flash('success_msg')
	res.locals.warning_msg = req.flash('warning_msg')
	next()
})
app.use(routes)

app.listen(port, () => {
	console.log(`App is running on http://localhost:${port}`)
})

