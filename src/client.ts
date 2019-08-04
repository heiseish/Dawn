import grpc from 'grpc';
// import { GRPC_PORT } from '../../../environment';
let GRPC_PORT = 8080;
import { ConverseServiceClient } from './main/protobuf/converse_service_grpc_pb';
import { ConversationInput } from './main/protobuf/converse_service_pb';
import { ImageRecognitionServiceClient } from './main/protobuf/image_recognition_service_grpc_pb';
import { ImageRequest } from './main/protobuf/image_recognition_service_pb';
import fs from 'fs';

// function to encode file data to base64 encoded string
const base64_encode = (file: string):string => {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return Buffer.from(bitmap).toString('base64');
}

// function to create file from base64 encoded string
const base64_decode = (base64str:string , file:string):void => {
    // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
    var bitmap = new Buffer(base64str, 'base64');
    // write buffer to file
    fs.writeFileSync(file, bitmap);
    console.log('******** File created from base64 encoded string ********');
}

var client = new ConverseServiceClient('127.0.0.1:' + GRPC_PORT, grpc.credentials.createInsecure());
let text = new ConversationInput();
text.setTransId("12314512");
text.setText("what shall I do");

client.respondToText(text, (err, resp) => {
	if (err) 
		console.log(err);
	console.log(resp.getState());
	console.log(resp.getText());
})

let imageClient = new ImageRecognitionServiceClient('127.0.0.1:' + GRPC_PORT, grpc.credentials.createInsecure(), {
    "grpc.max_send_message_length": 1024 * 1024 * 100
});
let req = new ImageRequest();

req.setTransId("12314512");
req.setImage(base64_encode('src/image.jpg'));

imageClient.recognizeImage(req, (err, resp) => {
	if (err) 
		console.log(err);
	console.log(resp.getState());
	console.log(resp.getText());
})
