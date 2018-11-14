"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_js_1 = __importDefault(require("./db.js"));
const text_1 = require("./text");
const doc_1 = __importDefault(require("./doc"));
const entity_1 = __importDefault(require("./entity"));
const location_1 = __importDefault(require("./location"));
const name_1 = __importDefault(require("./name"));
const response_1 = __importDefault(require("./response"));
const Schema = db_js_1.default.Schema;
const userSchema = new Schema({
    id: { type: String, require: true, unique: true, index: true },
    name: name_1.default,
    lastLocation: location_1.default,
    lastText: String,
    lastDoc: doc_1.default,
    text: [text_1.textSchema],
    entity: entity_1.default,
    response: response_1.default,
    locale: String,
}, { strict: false });
userSchema.statics.findAll = function () {
    return new Promise((resolve, reject) => {
        this.find({}, function (err, users) {
            if (err) {
                return reject(err);
            }
            else {
                return resolve(users);
            }
        });
    });
};
userSchema.statics.updateUser = function (id, user) {
    return new Promise((resolve, reject) => {
        this.findOneAndUpdate({ id: new RegExp(id, 'i') }, user, (err, newUser) => {
            if (err) {
                return reject(err);
            }
            else {
                return resolve(newUser);
            }
        });
    });
};
userSchema.statics.findUser = function (id) {
    return new Promise((resolve, reject) => {
        this.findOne({ id: new RegExp(id, 'i') }, (err, user) => {
            if (err) {
                reject(err);
            }
            if (user) {
                resolve(user);
            }
            else {
                resolve(null);
            }
        });
    });
};
userSchema.statics.addUser = function (user) {
    return new Promise((resolve, reject) => {
        const newUser = new this();
        Object.keys(user).forEach((key) => {
            newUser[key] = user[key];
        });
        newUser.save((err, user) => {
            if (err) {
                return reject(err);
            }
            else {
                return resolve(user);
            }
        });
    });
};
userSchema.statics.deleteUser = function (id) {
    return new Promise((resolve, reject) => {
        this.findOne({ id: new RegExp(id, 'i') }, (err, user) => {
            if (err) {
                return reject(err);
            }
            if (user != null) {
                user.remove((err) => {
                    if (err) {
                        return reject(err);
                    }
                });
            }
            else {
                return reject('No such user');
            }
        });
    });
};
exports.default = db_js_1.default.model('User', userSchema);
//# sourceMappingURL=user.js.map