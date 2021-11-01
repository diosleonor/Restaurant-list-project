// 定義所需變數
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
// const restaurants = require('./models/restaurant.json')
const Restaurant = require('./models/restaurant')
const bodyParser = require('body-parser')
// connect mongoose
mongoose.connect('mongodb://localhost/restaurant-list')
// connection status set-up
const db = mongoose.connection
// error situation
db.on('error', () => {
	console.log('Mongodb error!')
})
// success situation
db.once('open', () => {
	console.log('Mongodb connected')
})

// 啟動handlebars引擎
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// 取用靜態檔案:讀取 JSON 檔案，將種子資料載入應用程式
app.use(express.static('public'))

// 為了取得POST傳輸的資料，都先將資料經過bodyParser處理
app.use(bodyParser.urlencoded({ extended: true }))

// 路由設定
// 渲染index page:把資料帶入 handlebars 樣板中動態呈現
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
app.post('/restaurants/:restaurant_id/edit', (req, res) => {
	const id = req.params.restaurant_id
	const editedName = req.body.name
	const editedNameEn = req.body.name_en
	const editedCategory = req.body.category
	const editedNameLocation = req.body.location
	const editedNamePhone = req.body.phone
	const editedNameDescription = req.body.description
	return Restaurant.findById(id)
		.then(restaurant => {
			restaurant.name = editedName
			restaurant.name_en = editedNameEn
			restaurant.category = editedCategory
			restaurant.location = editedNameLocation
			restaurant.phone = editedNamePhone
			restaurant.description = editedNameDescription
			return restaurant.save()
		})
		.then(() => res.redirect(`/restaurants/${id}`))
		.catch(error => console.log(error))
})

//設定delete路由:
app.post('/restaurants/:restaurant_id/delete', (req, res) => {
	const id = req.params.restaurant_id
	return Restaurant.findById(id)
		.then(restaurant => restaurant.remove())
		.then(() => res.redirect('/'))
		.catch(error => console.log(error))
})

//渲染search page:用 Query String 打造搜尋功能
app.get('/search',(req, res) => {
	const keyword = req.query.keyword.toLowerCase().trim()
	const restaurant = restaurants.results.filter(restaurant => {
		return restaurant.category.toLowerCase().includes(keyword) || restaurant.name.toLowerCase().includes(keyword)
	})
	res.render('index', {restaurants:restaurant, keyword:keyword})
})

app.listen(port, () => {
	console.log(`App is running on http://localhost:${port}`)
})