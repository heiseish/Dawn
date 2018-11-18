import mongoose from './db'
const Schema = mongoose.Schema
export default new Schema({
	title: String,
	type: String,
	url: String,
	webview_height_ratio: String,
}, { strict: false, _id : false  })
