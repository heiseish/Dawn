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
const grpc_1 = __importDefault(require("grpc"));
// import { GRPC_PORT } from '../../../environment';
let GRPC_PORT = 8080;
const seq2seq_service_grpc_pb_1 = require("./main/protobuf/seq2seq_service_grpc_pb");
const seq2seq_service_pb_1 = require("./main/protobuf/seq2seq_service_pb");
const image_classification_service_grpc_pb_1 = require("./main/protobuf/image_classification_service_grpc_pb");
const image_classification_service_pb_1 = require("./main/protobuf/image_classification_service_pb");
const fs_1 = __importDefault(require("fs"));
const benchmark_1 = require("./main/utils/benchmark");
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
var client = new seq2seq_service_grpc_pb_1.Seq2SeqServiceClient('127.0.0.1:' + GRPC_PORT, grpc_1.default.credentials.createInsecure());
let text = new seq2seq_service_pb_1.ConversationInput();
text.setTransId("12314512");
text.setText("what shall I do");
let imageClient = new image_classification_service_grpc_pb_1.ImageClassificationServiceClient('127.0.0.1:' + GRPC_PORT, grpc_1.default.credentials.createInsecure(), {
// "grpc.max_send_message_length": 1024 * 1024 * 100
});
let req = new image_classification_service_pb_1.ImageRequest();
req.setTransId("12314512");
req.setImage('https://cataas.com/cat/says/hello%20world!');
const test = () => __awaiter(this, void 0, void 0, function* () {
    // 	console.log(await measureExecutionTimeCallback((resolve) => {
    // 		client.respondToText(text, (err, resp) => {
    // 			if (err) {
    // 				console.log(err);
    // 				return;
    // 			}
    // 			resolve(resp)
    // 		})
    //     }));
    //    client.respondToText(text, (err, resp) => {
    //         if (err) {
    //             console.log(err);
    //             return;
    //         }
    //         console.log(resp.getState())
    //         console.log(resp.getText())
    //     })
    console.log(yield benchmark_1.measureExecutionTimeCallback((resolve) => {
        imageClient.recognizeImage(req, (err, resp) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(resp.getText());
            resolve(resp);
        });
    }));
});
setInterval(test, 1000);
//# sourceMappingURL=client.js.map