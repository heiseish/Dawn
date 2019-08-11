"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const grpc_1 = __importDefault(require("grpc"));
// import { GRPC_PORT } from '../../../environment';
let GRPC_PORT = 8080;
const converse_service_grpc_pb_1 = require("./main/protobuf/converse_service_grpc_pb");
const converse_service_pb_1 = require("./main/protobuf/converse_service_pb");
const image_recognition_service_grpc_pb_1 = require("./main/protobuf/image_recognition_service_grpc_pb");
const image_recognition_service_pb_1 = require("./main/protobuf/image_recognition_service_pb");
const image_1 = require("./main/utils/image");
var client = new converse_service_grpc_pb_1.ConverseServiceClient('127.0.0.1:' + GRPC_PORT, grpc_1.default.credentials.createInsecure());
let text = new converse_service_pb_1.ConversationInput();
text.setTransId("12314512");
text.setText("what shall I do");
client.respondToText(text, (err, resp) => {
    if (err)
        console.log(err);
    console.log(resp.getState());
    console.log(resp.getText());
});
let imageClient = new image_recognition_service_grpc_pb_1.ImageRecognitionServiceClient('127.0.0.1:' + GRPC_PORT, grpc_1.default.credentials.createInsecure(), {
    "grpc.max_send_message_length": 1024 * 1024 * 100
});
let req = new image_recognition_service_pb_1.ImageRequest();
req.setTransId("12314512");
req.setImage(image_1.base64Encode('src/image.jpg'));
imageClient.recognizeImage(req, (err, resp) => {
    if (err)
        console.log(err);
    console.log(resp.getState());
    console.log(resp.getText());
});
//# sourceMappingURL=client.js.map