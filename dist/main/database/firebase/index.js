"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin = __importStar(require("firebase-admin"));
const encrypt_1 = require("../../utils/encrypt");
const logger_1 = __importDefault(require("../../logger"));
const account_json_1 = __importDefault(require("./account.json"));
class Firebase {
    constructor() {
        /**
        * Terminate connection to firebase database
        */
        this.terminateConnection = () => {
            logger_1.default.warn('Closing connection to firebase db', Firebase.name);
            this.db.app().delete();
        };
        logger_1.default.info('Establishing connection to firebase', false, Firebase.name);
        this.db = admin;
        try {
            this.db.initializeApp({
                credential: admin.credential.cert(encrypt_1.decrypt(account_json_1.default)),
                databaseURL: 'https://mvpapp-1ba71.firebaseio.com',
            });
        }
        catch (e) {
            logger_1.default.error(e, Firebase.name);
        }
    }
    /**
    * Get a list of streaming audience
    * @returns {Promise<dawn.StreamPerson[]>} list of streaming audience
    */
    getStreamingAudience() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const snap = yield this.db.database().ref('restricted_access/streaming/').once('value');
                const result = snap.val();
                let audience = [];
                if (Array.isArray(result)) {
                    audience = result;
                }
                else if (typeof result === 'object') {
                    audience = Object.values(result);
                }
                return audience;
            }
            catch (e) {
                logger_1.default.error(e, Firebase.name);
            }
        });
    }
    /**
    * Get codeforce handle
    * @returns {Promise<string>} handle
    */
    getCodeforceHandle() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const snap = yield this.db.database().ref('restricted_access/codeforce/').once('value');
                const users = snap.val();
                return users;
            }
            catch (e) {
                logger_1.default.error(e, Firebase.name);
            }
        });
    }
    /**
    * Get current codeforce standing
    * @param {string} handle
    * @param {CodeforceRanking} ranking ranking
    */
    setCurrentCodeforceStanding(handle, ranking) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.db.database().ref(`restricted_access/codeforce/${handle}/standing/`).set(ranking);
            }
            catch (e) {
                logger_1.default.error(e, Firebase.name);
            }
        });
    }
}
exports.default = Firebase;
//# sourceMappingURL=index.js.map