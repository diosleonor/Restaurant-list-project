const mongoose = require('mongoose')
// mongoose setting 
mongoose.connect('mongodb://localhost/restaurant-list')
const db = mongoose.connection
db.on('error', () => {
	console.log('Mongodb error!')
})
db.once('open', () => {
	console.log('Mongodb connected')
})

module.exports = db