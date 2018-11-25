import mongoose from 'mongoose'
import docSchema from './doc'
import entitySchema from './entity'
import locationSchema from './location'
import nameSchema from './name'
import responseSchema from './response'
import textSchema from './text'

export default class UserDB {
	private schema
	private model

	constructor(mongoose: any) {
		this.schema = new mongoose.Schema({
			id: { type: String, require: true, unique: true, index: true },
			name: nameSchema(mongoose),
			lastLocation: locationSchema(mongoose),
			lastText: String,
			lastDoc: docSchema(mongoose),
			// text: [textSchema(mongoose)],
			entity: entitySchema(mongoose),
			response: responseSchema(mongoose),
			locale: String,
		}, { strict: false })
		this.model = mongoose.model('User', this.schema);
	}

	public updateUser (id: string, user: any):Promise<userType> {
		return new Promise((resolve, reject) => {
			this.model.findOneAndUpdate({id: new RegExp(id, 'i')}, user, { lean: true }, (err, newUser) => {
				if (err) return reject(err)
				else return resolve(newUser)
			})
		})
	}
	
	public findUser(id: string):Promise<null | userType> {
		return new Promise((resolve, reject) => {
			this.model.findOne({id: new RegExp(id, 'i')}).lean().exec((err, user) => {
				if (err) reject(err)
				if (user) resolve(user)
				else resolve(null) 
			})
		})
	}

	public addUser (user: userType):Promise<string | Error> {
		return new Promise((resolve, reject) => {
			this.model.create(user, (err, res) => {
				if (err) reject(err)
				else resolve('OK')
			})
		})
	}
}

