import grpc from 'grpc';
// import { GRPC_PORT } from '../../../environment';
let GRPC_PORT = 8080;
import { ConverseServiceClient } from './main/protobuf/converse_service_grpc_pb';
import { ConversationInput } from './main/protobuf/converse_service_pb';
import { ImageRecognitionServiceClient } from './main/protobuf/image_recognition_service_grpc_pb';
import { ImageRequest } from './main/protobuf/image_recognition_service_pb';
import { base64Encode } from './main/utils/image';



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
req.setImage(base64Encode('src/image.jpg'));

imageClient.recognizeImage(req, (err, resp) => {
	if (err) 
		console.log(err);
	console.log(resp.getState());
	console.log(resp.getText());
})
