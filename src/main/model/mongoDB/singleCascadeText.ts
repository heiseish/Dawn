import mongoose from './db.js'
import listTemplateButtonSchema from './listTemplateButton'
const Schema = mongoose.Schema
export default new Schema({
	title: String,
	subtitle: String,
	image_url: String,
	buttons: [listTemplateButtonSchema],
}, { strict: false, _id : false  })
