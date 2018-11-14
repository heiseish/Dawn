import mongoose from './db.js'
const Schema = mongoose.Schema
export default new Schema({
	lastIntent: String,
	sentiment: String,
}, { strict: false , _id : false })
