import mongoose from './db'
const Schema = mongoose.Schema
export default new Schema({
	type: String,
	value: String,
}, { strict: false , _id : false })
