// 此文件會代表 Restaurant model
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantSchema = new Schema({
	userId:{
		type: Schema.Types.ObjectId,
		ref: 'User',
		index: true,
		required: true
	},
	id:{
		type: Number,
		required: false
	},
	name:{
		type: String,
		required: true
	},
	name_en:{		
		type: String,
		required: false
	},
	category:{
		type: String,
		required: false
	},
	image:{
		type: String,
		required: false
	},
	location:{
		type: String,
		required: true
	},
	phone:{
		type: String,
		required: true
	},
	google_map:{
		type: String,
		required: false
	},
	rating:{
		type: Number,
		required: false
	},
	description:{
		type: String,
		required: false
	}
}) 

module.exports = mongoose.model('Restaurant', restaurantSchema)
