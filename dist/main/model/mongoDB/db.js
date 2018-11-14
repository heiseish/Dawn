"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../logger"));
const mongoose_1 = __importDefault(require("mongoose"));
const environment_1 = require("../../environment");
const options = {
    autoReconnect: true,
    reconnectTries: 100,
    reconnectInterval: 500,
    poolSize: 10,
    bufferMaxEntries: 0,
    useNewUrlParser: true,
};
mongoose_1.default.connect(environment_1.MONGO_DB_URI, options).then(() => logger_1.default.info('Established connection to mlab'), (err) => logger_1.default.error(err));
mongoose_1.default.set('useCreateIndex', true);
mongoose_1.default.connection.on('reconnectFailed', () => logger_1.default.error('Mongoose attemp to recoonect failed'));
exports.default = mongoose_1.default;
//# sourceMappingURL=db.js.map