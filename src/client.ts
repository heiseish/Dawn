import dotenv from 'dotenv';
dotenv.config();
import { NodeHttpTransport } from '@improbable-eng/grpc-web-node-http-transport';
import { 
	TextResponseServiceClient 
} from './main/protobuf/text_generator_service_pb_service';
import {
	Sentence
} from './main/protobuf/text_generator_service_pb';

const client = new TextResponseServiceClient('127.0.0.1:8080', {
	transport: NodeHttpTransport()
});
const req = new Sentence();
req.setGreeting('johndoe');
client.respondToText(req, (err, res) => {
	if (err) {
		console.log(err)
		return;
	}
	console.log(res)
});
