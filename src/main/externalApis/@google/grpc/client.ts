import grpc from 'grpc';
import { GRPC_PORT } from '../../../environment';
import { TextResponseServiceClient } from '../../../protobuf/text_generator_service_grpc_pb';
import { Sentence } from '../../../protobuf/text_generator_service_pb';
var client = new TextResponseServiceClient('127.0.0.1:' + GRPC_PORT, grpc.credentials.createInsecure());
let text = new Sentence();
text.setGreeting('Giang');
client.respondToText(text, (err, resp) => {
	if (err) 
		console.log(err);
	console.log(resp.getReply());
})
text.setGreeting('Yen');
client.respondToText(text, (err, resp) => {
	if (err) 
		console.log(err);
	console.log(resp.getReply());
})