// 定義所需變數
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const Restaurant = require('./models/restaurant')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
// mongoose setting 
mongoose.connect('mongodb://localhost/restaurant-list')
const db = mongoose.connection
db.on('error', () => {
	console.log('Mongodb error!')
})
db.once('open', () => {
	console.log('Mongodb connected')
})

// view engine set as handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// use the static document including stylesheet
app.use(express.static('public'))

// process all data by bodyParser before routing
app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))
// route setting
// 設定index頁面路由
app.get('/', (req,res) => {
	Restaurant.find()
	.lean()
	.then(restaurants => res.render('index', { restaurants }))
	.catch(error => console.log(error))
})

// 設定new頁面路由
app.get('/restaurants/new', (req, res) => {
	return res.render('new')
})

// 取得new的表單資料並新增到資料庫
app.post('/restaurants', (req, res) => {
	const data = req.body
	return Restaurant.create(data)
		.then(() => res.redirect('/'))
		.catch(error => console.log(error))
})

// 設定detail頁面路由:應用 params 打造動態路由
app.get('/restaurants/:restaurant_id', (req, res) => {
	const id = req.params.restaurant_id
	return Restaurant.findById(id)
		.lean()
		.then(restaurant => res.render('detail', { restaurant }))
		.catch(error => console.log(error))
})

// 設定edit頁面路由:同detail頁面
app.get('/restaurants/:restaurant_id/edit', (req, res) => {
	const id = req.params.restaurant_id
	return Restaurant.findById(id)
		.lean()
		.then(restaurant => res.render('edit', { restaurant }))
		.catch(error => console.log(error))
})

// 取得edit的表單資料並修改到資料庫
app.put('/restaurants/:restaurant_id', (req, res) => {
	const id = req.params.restaurant_id
	const editedName = req.body.name
	const editedNameEn = req.body.name_en
	const editedCategory = req.body.category
	const editedNameLocation = req.body.location
	const editedGoogleMap = req.body.google_map
	const editedNamePhone = req.body.phone
	const editedRating = req.body.rating
	const editedNameDescription = req.body.description
	const editedImage = req.body.image
	return Restaurant.findById(id)
		.then(restaurant => {
			restaurant.name = editedName
			restaurant.name_en = editedNameEn
			restaurant.category = editedCategory
			restaurant.location = editedNameLocation
			restaurant.google_map = editedGoogleMap
			restaurant.phone = editedNamePhone
			restaurant.rating = editedRating
			restaurant.description = editedNameDescription
			restaurant.image = editedImage
			return restaurant.save()
		})
		.then(() => res.redirect(`/restaurants/${id}`))
		.catch(error => console.log(error))
})

//設定delete路由:
app.delete('/restaurants/:restaurant_id', (req, res) => {
	const id = req.params.restaurant_id
	return Restaurant.findById(id)
		.then(restaurant => restaurant.remove())
		.then(() => res.redirect('/'))
		.catch(error => console.log(error))
})

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

