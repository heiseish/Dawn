import mongoose from './db.js'
const Schema = mongoose.Schema
export default new Schema({
	first: String,
	last: String,
	full: { type: String, index: true},
}, { strict: false, _id : false  })
