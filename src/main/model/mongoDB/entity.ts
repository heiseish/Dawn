import mongoose from './db'
const Schema = mongoose.Schema
export default new Schema({
	lastIntent: String,
	sentiment: String,
}, { strict: false , _id : false })
