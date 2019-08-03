"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const grpc_1 = __importDefault(require("grpc"));
const text_generator_service_grpc_pb_1 = require("./main/protobuf/text_generator_service_grpc_pb");
const text_generator_service_pb_1 = require("./main/protobuf/text_generator_service_pb");
var client = new text_generator_service_grpc_pb_1.TextResponseServiceClient('127.0.0.1:8080', grpc_1.default.credentials.createInsecure());
let text = new text_generator_service_pb_1.Sentence();
text.setGreeting('Giang');
client.respondToText(text, (err, resp) => {
    if (err)
        console.log(err);
    console.log(resp.getReply());
});
//# sourceMappingURL=client.js.map