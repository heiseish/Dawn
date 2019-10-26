"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const grpc_1 = __importDefault(require("grpc"));
const environment_1 = require("../../../environment");
const seq2seq_service_grpc_pb_1 = require("../../../protobuf/seq2seq_service_grpc_pb");
const seq2seq_service_pb_1 = require("../../../protobuf/seq2seq_service_pb");
const client = new seq2seq_service_grpc_pb_1.Seq2SeqServiceClient(environment_1.GRPC_ADDR, grpc_1.default.credentials.createInsecure());
const RunInferenceSequence2Sequence = (text) => {
    return new Promise((resolve, reject) => {
        let req = new seq2seq_service_pb_1.ConversationInput();
        req.setTransId("1");
        req.setText(text);
        client.respondToText(req, (err, resp) => {
            if (err) {
                resolve(err.message);
            }
            else if (resp.getState() !== seq2seq_service_pb_1.ConversationResponse.State.SUCCESS) {
                resolve('Unable to run inference');
            }
            else {
                resolve(resp.getText());
            }
        });
    });
};
exports.RunInferenceSequence2Sequence = RunInferenceSequence2Sequence;
//# sourceMappingURL=client.js.map