"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const doc_1 = __importDefault(require("./doc"));
const entity_1 = __importDefault(require("./entity"));
const location_1 = __importDefault(require("./location"));
const name_1 = __importDefault(require("./name"));
const response_1 = __importDefault(require("./response"));
class UserDB {
    constructor(mongoose) {
        /**
         * Update the user in database
         * @param {string} id id of the user to be updated
         * @param {dawn.Context} user updated information of the user
         * @returns updated user
         */
        this.updateUser = (id, user) => {
            return new Promise((resolve, reject) => {
                this.model.findOneAndUpdate({ id: new RegExp(id, 'i') }, user).lean().exec((err, newUser) => {
                    if (err)
                        reject(err);
                    if (newUser)
                        resolve(newUser);
                    else {
                        this.addUser(user);
                        return user;
                    }
                });
            });
        };
        this.findOrCreateUser = (ctx) => __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield this.findUser(ctx.id);
                if (user != null) {
                    return user;
                }
                return yield this.addUser(ctx);
            }
            catch (e) {
                return Promise.reject(e);
            }
        });
        /**
         * Find user in the database
         * @param id string
         * @returns User if user if found, null otherwise
         */
        this.findUser = (id) => {
            return new Promise((resolve, reject) => {
                this.model.findOne({ id: new RegExp(id, 'i') }).lean().exec((err, user) => {
                    if (err)
                        reject(err);
                    if (user)
                        resolve(user);
                    else
                        resolve(null);
                });
            });
        };
        /**
         * Add user to database
         * @param user user to be add
         * @returns {Promise<void>} OK string if there is no error
         */
        this.addUser = (user) => {
            return new Promise((resolve, reject) => {
                this.model.create(user, (err, res) => {
                    if (err)
                        reject(err);
                    else
                        resolve(res);
                });
            });
        };
        this.schema = new mongoose.Schema({
            id: { type: String, require: true, unique: true, index: true },
            name: name_1.default(mongoose),
            lastLocation: location_1.default(mongoose),
            lastText: String,
            lastDoc: doc_1.default(mongoose),
            // text: [textSchema(mongoose)],
            entity: entity_1.default(mongoose),
            response: response_1.default(mongoose),
            locale: String,
        }, { strict: false });
        this.model = mongoose.model('User', this.schema);
    }
}
exports.default = UserDB;
//# sourceMappingURL=user.js.map