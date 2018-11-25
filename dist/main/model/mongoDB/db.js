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
const mongoose_1 = __importDefault(require("mongoose"));
const environment_1 = require("../../environment");
const logger_1 = __importDefault(require("../../logger"));
/**
 * Establish connection to mongoose
 */
const initiateConnectionToMongoDB = () => __awaiter(this, void 0, void 0, function* () {
    const log = logger_1.default.info('Establishing connection to mongoDB...', true);
    const options = {
        autoReconnect: true,
        reconnectTries: 100,
        reconnectInterval: 500,
        poolSize: 10,
        bufferMaxEntries: 0,
        useNewUrlParser: true,
    };
    yield mongoose_1.default.connect(environment_1.MONGO_DB_URI, options).then(() => log.stop('Established connection to mongoDB'), (err) => {
        log.stop('Failed to establish connection to mongoDB: ');
        logger_1.default.error(err);
    });
    mongoose_1.default.set('useCreateIndex', true);
    mongoose_1.default.connection.on('reconnectFailed', () => logger_1.default.error('Mongoose attemp to recoonect failed'));
    return mongoose_1.default;
});
exports.default = initiateConnectionToMongoDB;
//# sourceMappingURL=db.js.map