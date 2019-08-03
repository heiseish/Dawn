"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const text_generator_service_pb_service_1 = require("./main/protobuf/text_generator_service_pb_service");
const text_generator_service_pb_1 = require("./main/protobuf/text_generator_service_pb");
const client = new text_generator_service_pb_service_1.TextResponseServiceClient('localhost:8080');
const req = new text_generator_service_pb_1.Sentence();
req.setGreeting('johndoe');
client.respondToText(req, (err, res) => {
    console.log(res);
});
//# sourceMappingURL=client.js.map