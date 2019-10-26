// GENERATED CODE -- DO NOT EDIT!
'use strict';
var grpc = require('grpc');
var converse_service_pb = require('./converse_service_pb.js');
function serialize_ConverseServiceGRPC_ConversationInput(arg) {
    if (!(arg instanceof converse_service_pb.ConversationInput)) {
        throw new Error('Expected argument of type ConverseServiceGRPC.ConversationInput');
    }
    return Buffer.from(arg.serializeBinary());
}
function deserialize_ConverseServiceGRPC_ConversationInput(buffer_arg) {
    return converse_service_pb.ConversationInput.deserializeBinary(new Uint8Array(buffer_arg));
}
function serialize_ConverseServiceGRPC_ConversationResponse(arg) {
    if (!(arg instanceof converse_service_pb.ConversationResponse)) {
        throw new Error('Expected argument of type ConverseServiceGRPC.ConversationResponse');
    }
    return Buffer.from(arg.serializeBinary());
}
function deserialize_ConverseServiceGRPC_ConversationResponse(buffer_arg) {
    return converse_service_pb.ConversationResponse.deserializeBinary(new Uint8Array(buffer_arg));
}
var ConverseServiceService = exports.ConverseServiceService = {
    respondToText: {
        path: '/ConverseServiceGRPC.ConverseService/RespondToText',
        requestStream: false,
        responseStream: false,
        requestType: converse_service_pb.ConversationInput,
        responseType: converse_service_pb.ConversationResponse,
        requestSerialize: serialize_ConverseServiceGRPC_ConversationInput,
        requestDeserialize: deserialize_ConverseServiceGRPC_ConversationInput,
        responseSerialize: serialize_ConverseServiceGRPC_ConversationResponse,
        responseDeserialize: deserialize_ConverseServiceGRPC_ConversationResponse,
    },
};
exports.ConverseServiceClient = grpc.makeGenericClientConstructor(ConverseServiceService);
//# sourceMappingURL=converse_service_grpc_pb.js.map