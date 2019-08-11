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
const fs_1 = __importDefault(require("fs"));
// function to encode file data to base64 encoded string
const base64_encode = (file) => {
    // read binary data
    var bitmap = fs_1.default.readFileSync(file);
    // convert binary data to base64 encoded string
    return Buffer.from(bitmap).toString('base64');
};
// function to create file from base64 encoded string
const base64_decode = (base64str, file) => {
    // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
    var bitmap = new Buffer(base64str, 'base64');
    // write buffer to file
    fs_1.default.writeFileSync(file, bitmap);
    console.log('******** File created from base64 encoded string ********');
};
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
req.setImage(base64_encode('src/image.jpg'));
imageClient.recognizeImage(req, (err, resp) => {
    if (err)
        console.log(err);
    console.log(resp.getState());
    console.log(resp.getText());
});
//# sourceMappingURL=client.js.map