import grpc from 'grpc';
// import { GRPC_PORT } from '../../../environment';
let GRPC_PORT = 8080;
import { Seq2SeqServiceClient } from './main/protobuf/seq2seq_service_grpc_pb';
import { ConversationInput } from './main/protobuf/seq2seq_service_pb';
import { ImageClassificationServiceClient } from './main/protobuf/image_classification_service_grpc_pb';
import { ImageRequest } from './main/protobuf/image_classification_service_pb';
import fs from 'fs';
import { measureExecutionTimeCallback } from './main/utils/benchmark';
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

var client = new Seq2SeqServiceClient('0.0.0.0:' + GRPC_PORT, grpc.credentials.createInsecure());
let text = new ConversationInput();
text.setTransId("12314512");
text.setText("what shall I do");


let imageClient = new ImageClassificationServiceClient('0.0.0.0:' + GRPC_PORT, grpc.credentials.createInsecure(), {
    // "grpc.max_send_message_length": 1024 * 1024 * 100
});
let req = new ImageRequest();

req.setTransId("12314512");
req.setImage('https://cataas.com/cat/says/hello%20world!');

const test = async () => {
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

	console.log(await measureExecutionTimeCallback((resolve) => {
		imageClient.recognizeImage(req, (err, resp) => {
			if (err) {
				console.log(err);
				return;
			}
			console.log(resp.getText())
			resolve(resp);
		})
		
	}))

} 
setInterval(test, 1000)

