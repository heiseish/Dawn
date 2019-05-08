/**
 * Create text schema
 * @param mongoose mongodb connection
 */
const createTextSchema = (mongoose: any): any => {
	const Schema = mongoose.Schema;
	const textSchema = new Schema({
		correctlyResponded: { type: Boolean, default: false, index: true},
		originalText: String,
		tokenizedText: [String],
		timeStamp: { type: Date, default: Date.now},
	}, { strict: false });

	textSchema.statics.findAll = function() {
		this.find({}, function(err, texts) {
			if (err) { return Promise.reject(err); } else { return Promise.resolve(texts); }
		});
	};

	textSchema.statics.findIncorrectResponse = function() {
		this.find({correctlyResponded: false}, (err, texts) => {
			if (err) { return Promise.reject(err); } else { return Promise.resolve(texts); }
		});
	};

	textSchema.statics.deleteAll = function() {
		this.find({}, function(err, texts) {
			if (err) { return Promise.reject(err); } else {
				for (const text of texts) {
					text.remove((err) => {
						if (err) { return Promise.reject(err); }
					});
				}
			}
		});
	};
	return mongoose.model('Text', textSchema);
};

export default createTextSchema;
