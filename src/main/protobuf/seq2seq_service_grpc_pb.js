// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var seq2seq_service_pb = require('./seq2seq_service_pb.js');

function serialize_Seq2SeqGRPC_ConversationInput(arg) {
  if (!(arg instanceof seq2seq_service_pb.ConversationInput)) {
    throw new Error('Expected argument of type Seq2SeqGRPC.ConversationInput');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Seq2SeqGRPC_ConversationInput(buffer_arg) {
  return seq2seq_service_pb.ConversationInput.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Seq2SeqGRPC_ConversationResponse(arg) {
  if (!(arg instanceof seq2seq_service_pb.ConversationResponse)) {
    throw new Error('Expected argument of type Seq2SeqGRPC.ConversationResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Seq2SeqGRPC_ConversationResponse(buffer_arg) {
  return seq2seq_service_pb.ConversationResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var Seq2SeqServiceService = exports.Seq2SeqServiceService = {
  respondToText: {
    path: '/Seq2SeqGRPC.Seq2SeqService/RespondToText',
    requestStream: false,
    responseStream: false,
    requestType: seq2seq_service_pb.ConversationInput,
    responseType: seq2seq_service_pb.ConversationResponse,
    requestSerialize: serialize_Seq2SeqGRPC_ConversationInput,
    requestDeserialize: deserialize_Seq2SeqGRPC_ConversationInput,
    responseSerialize: serialize_Seq2SeqGRPC_ConversationResponse,
    responseDeserialize: deserialize_Seq2SeqGRPC_ConversationResponse,
  },
};

exports.Seq2SeqServiceClient = grpc.makeGenericClientConstructor(Seq2SeqServiceService);
