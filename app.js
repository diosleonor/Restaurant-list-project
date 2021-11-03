// 定義所需變數
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const Restaurant = require('./models/restaurant')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
require('./config/mongoose')
// view engine set as handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// use the static document including stylesheet
app.use(express.static('public'))

// process all data by bodyParser before routing
app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))
app.use(routes)

// route setting

//渲染search page:用 Query String 打造搜尋功能
// app.get('/search',(req, res) => {
// 	const keyword = req.query.keyword.toLowerCase().trim()
// 	res.render('index', {restaurants, keyword})
// })
// 可以印出篩選的資料
// app.get('/search',(req, res) => {
// 	const keyword = req.query.keyword.toLowerCase().trim()
// 	Restaurant.find({}, (err, restaurants) => {
// 	  if (err) {return console.error(err)}
// 	  return restaurants.filter(restaurant => {
// 		return restaurant.category.toLowerCase().includes(keyword) || restaurant.name.toLowerCase().includes(keyword)
// 	})
// 	})
// })

app.listen(port, () => {
	console.log(`App is running on http://localhost:${port}`)
})

