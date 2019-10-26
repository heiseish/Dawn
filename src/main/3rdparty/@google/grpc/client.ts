import grpc from 'grpc';
import { GRPC_ADDR } from '../../../environment';

import { Seq2SeqServiceClient } from '../../../protobuf/seq2seq_service_grpc_pb';
import { ConversationInput, ConversationResponse } from '../../../protobuf/seq2seq_service_pb';
const client = new Seq2SeqServiceClient(GRPC_ADDR, grpc.credentials.createInsecure());

const RunInferenceSequence2Sequence = (text: string): Promise<string> =>  {
    return new Promise((resolve, reject) => {
        let req = new ConversationInput();
        req.setTransId("1");
        req.setText(text);
        client.respondToText(req, (err, resp) => {
            if (err) {
                resolve(err.message);
            } else  if (resp.getState() !== ConversationResponse.State.SUCCESS) {
                resolve('Unable to run inference');
            } else {
                resolve(resp.getText());
            }
        })
    })
    
}
export  {
    RunInferenceSequence2Sequence,
}

