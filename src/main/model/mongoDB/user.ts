import mongoose from './db'
import docSchema from './doc'
import entitySchema from './entity'
import locationSchema from './location'
import nameSchema from './name'
import responseSchema from './response'
import { textSchema } from './text'

const Schema = mongoose.Schema
const userSchema = new Schema({
	id: { type: String, require: true, unique: true, index: true },
	name: nameSchema,
	lastLocation: locationSchema,
	lastText: String,
	lastDoc: docSchema,
	text: [textSchema],
	entity: entitySchema,
	response: responseSchema,
	locale: String,
}, { strict: false })

userSchema.statics.findAll = function() {
	return new Promise((resolve, reject) => {
		this.find({}, function(err, users) {
			if (err) { return reject(err) } else { return resolve(users) }
		})
	})

}

userSchema.statics.updateUser = function(id: string, user: any) {
	return new Promise((resolve, reject) => {
		this.findOneAndUpdate({id: new RegExp(id, 'i')}, user, (err, newUser) => {
			if (err) { return reject(err) } else { return resolve(newUser) }
		})
	})
}

userSchema.statics.findUser = function(id: string) {
	return new Promise((resolve, reject) => {
		this.findOne({id: new RegExp(id, 'i')}, (err, user) => {
			if (err) { reject(err) }
			if (user) { resolve(user) } else { resolve(null) }
		})
	})

}

userSchema.statics.addUser = function(user: any) {
	return new Promise((resolve, reject) => {
		const newUser = new this()
		Object.keys(user).forEach((key) => {
			newUser[key] = user[key]
		})
		newUser.save((err, user)  => {
			if (err) { return reject(err) } else { return resolve(user) }
		})
	})

}

userSchema.statics.deleteUser = function(id) {
	return new Promise((resolve, reject) => {
		this.findOne({id: new RegExp(id, 'i')}, (err, user) => {
			if (err) { return reject(err) }
			if (user != null) {
				user.remove((err) =>  {
					if (err) { return reject(err) }
				})
			} else { return reject('No such user') }
		})
	})

}
export default mongoose.model('User', userSchema)
