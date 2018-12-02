"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const environment_1 = require("../../environment");
const logger_1 = __importDefault(require("../../logger"));
const user_1 = __importDefault(require("./user"));
// import textSchema from './text'
class MongoDB {
    /**
     * Create a instance of mongo db
     */
    constructor() {
        this.options = {
            autoReconnect: true,
            reconnectTries: 100,
            reconnectInterval: 500,
            poolSize: 10,
            bufferMaxEntries: 0,
            useNewUrlParser: true,
        };
        /**
         * Terminate connection to mongoose database
         */
        this.terminateConnection = () => {
            logger_1.default.warn('Closing connection to Mongo DB...');
            this.db.connection.close();
        };
        this.db = mongoose_1.default;
        this.db.connect(environment_1.MONGO_DB_URI, this.options).then(() => logger_1.default.info('Established connection to mongoDB'), (err) => {
            logger_1.default.error('Failed to establish connection to mongoDB: ');
            logger_1.default.error(err);
        });
        this.db.set('useCreateIndex', true);
        this.users = new user_1.default(this.db);
        // this.texts = textSchema(this.db)
    }
}
exports.default = MongoDB;
//# sourceMappingURL=index.js.map