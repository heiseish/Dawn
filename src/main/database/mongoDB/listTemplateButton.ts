/**
 * createListTemplateButtonSchema
 * @param {any} mongoose mongodb connection
 */
const createListTemplateButtonSchema = (mongoose: any): any => {
	const Schema = mongoose.Schema;
	return new Schema({
		title: String,
		type: String,
		url: String,
		webview_height_ratio: String,
	}, { strict: false, _id : false  });
};
export default createListTemplateButtonSchema;
