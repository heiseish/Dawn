import mongoose from './db'
import singleCascadeTextSchema from './singleCascadeText'

const Schema = mongoose.Schema
export default new Schema({
	answerable: Boolean,
	simpleText: String,
	image: String,
	imageId: Number,
	url: String,
	cascadeText: [singleCascadeTextSchema],
	multipleText: [String],
}, { strict: false, _id : false  })
