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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const account_json_1 = __importDefault(require("./account.json"));
const admin = __importStar(require("firebase-admin"));
const encrypt_1 = require("../../lib/encrypt");
const logger_1 = __importDefault(require("../../logger"));
class Firebase {
    constructor() {
        /**
         * Terminate connection to firebase database
         */
        this.terminateConnection = () => {
            logger_1.default.warn('Closing connection to firebase db...');
            this.db.app().delete();
        };
        logger_1.default.info('Establishing connection to firebase...');
        this.db = admin;
        this.db.initializeApp({
            credential: admin.credential.cert(encrypt_1.decrypt(account_json_1.default)),
            databaseURL: 'https://mvpapp-1ba71.firebaseio.com',
        });
    }
    /**
     * Get a list of streaming audience
     * @returns {Promise<string[]>} list of streaming audience
     */
    getStreamingAudience() {
        return __awaiter(this, void 0, void 0, function* () {
            const snap = yield this.db.database().ref('restricted_access/streaming/').once('value');
            const result = snap.val();
            let audience = [];
            if (Array.isArray(result))
                audience = result;
            else if (typeof result === 'object')
                audience = Object.values(result);
            return audience;
        });
    }
    /**
     * Get codeforce handle
     * @returns {Promise<string>} handle
     */
    getCodeforceHandle() {
        return __awaiter(this, void 0, void 0, function* () {
            const snap = yield this.db.database().ref('restricted_access/codeforce/handle').once('value');
            return snap.val();
        });
    }
    /**
     * Get current codeforce standing
     * @returns {Promise<CFRanking>} cf ranking
     */
    getCurrentCodeforceStanding() {
        return __awaiter(this, void 0, void 0, function* () {
            const snap = yield this.db.database().ref('restricted_access/codeforce/standing/').once('value');
            return snap.val();
        });
    }
    /**
     * Get current codeforce standing
     * @param {CFRanking} cf ranking
     */
    setCurrentCodeforceStanding(ranking) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.database().ref('restricted_access/codeforce/standing/').set(ranking);
        });
    }
}
exports.default = Firebase;
//# sourceMappingURL=index.js.map