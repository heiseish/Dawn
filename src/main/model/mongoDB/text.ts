import mongoose from './db.js'
const Schema = mongoose.Schema
let textSchema = new Schema({
	correctlyResponded: { type: Boolean, default: false, index: true},
	originalText: String,
	tokenizedText: [String],
	timeStamp: { type: Date, default: Date.now},
}, { strict: false })

textSchema.statics.findAll = function() {
	this.find({}, function(err, texts) {
		if (err) { return Promise.reject(err) } else { return Promise.resolve(texts) }
	})
}

textSchema.statics.findIncorrectResponse = function() {
	this.find({correctlyResponded: false}, (err, texts) => {
		if (err) { return Promise.reject(err) } else { return Promise.resolve(texts) }
	})
}

textSchema.statics.deleteAll = function() {
	this.find({}, function(err, texts) {
		if (err) { return Promise.reject(err) } else {
			for (const text of texts) {
				text.remove((err) => {
					if (err) { return Promise.reject(err) }
				})
			}
		}
	})
}

const Text = mongoose.model('Text', textSchema)
export {
	Text,
	textSchema,
}
