// 定義所需變數
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const hbshelpers = require('handlebars-helpers')
const multihelpers = hbshelpers()
const Restaurant = require('./models/restaurant')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
require('./config/mongoose')
// view engine set as handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main', helpers:'multihelpers'}))
app.set('view engine', 'handlebars')

// use the static document including stylesheet
app.use(express.static('public'))

// process all data by bodyParser before routing
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

app.listen(port, () => {
	console.log(`App is running on http://localhost:${port}`)
})

