import mongoose from './db.js'
const Schema = mongoose.Schema
export default new Schema({
	type: String,
	value: String,
}, { strict: false , _id : false })
