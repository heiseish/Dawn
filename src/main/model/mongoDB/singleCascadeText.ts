import listTemplateButtonSchema from './listTemplateButton'

/**
 * Create a single caseCadetext schema
 * @param {any} mongoose mongodb connection
 */
export default (mongoose: any):any => {
	const Schema = mongoose.Schema
	return new Schema({
		title: String,
		subtitle: String,
		image_url: String,
		buttons: [listTemplateButtonSchema(mongoose)],
	}, { strict: false, _id : false  })
}

