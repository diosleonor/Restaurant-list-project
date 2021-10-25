// 定義所需變數
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurants = require('./restaurant.json')

// 取用handlebars引擎
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// 取用靜態檔案:讀取 JSON 檔案，將種子資料載入應用程式
app.use(express.static('public'))

// 渲染index page:把資料帶入 handlebars 樣板中動態呈現
app.get('/', (req,res) => {
	res.render('index',{restaurants:restaurants.results})
})

// 渲染show page:應用 params 打造動態路由
app.get('/restaurants/:restaurants_id', (req, res) => {
	const restaurant = restaurants.results.find(restaurant => restaurant.id.toString() === req.params.restaurants_id)
	res.render('show', {restaurant: restaurant})
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
	console.log(`Express is running on http://localhost:${port}`)
})