// GENERATED CODE -- DO NOT EDIT!
'use strict';
var grpc = require('grpc');
var text_generator_service_pb = require('./text_generator_service_pb.js');
function serialize_TextGeneratorGRPC_Response(arg) {
    if (!(arg instanceof text_generator_service_pb.Response)) {
        throw new Error('Expected argument of type TextGeneratorGRPC.Response');
    }
    return Buffer.from(arg.serializeBinary());
}
function deserialize_TextGeneratorGRPC_Response(buffer_arg) {
    return text_generator_service_pb.Response.deserializeBinary(new Uint8Array(buffer_arg));
}
function serialize_TextGeneratorGRPC_Sentence(arg) {
    if (!(arg instanceof text_generator_service_pb.Sentence)) {
        throw new Error('Expected argument of type TextGeneratorGRPC.Sentence');
    }
    return Buffer.from(arg.serializeBinary());
}
function deserialize_TextGeneratorGRPC_Sentence(buffer_arg) {
    return text_generator_service_pb.Sentence.deserializeBinary(new Uint8Array(buffer_arg));
}
var TextResponseServiceService = exports.TextResponseServiceService = {
    respondToText: {
        path: '/TextGeneratorGRPC.TextResponseService/RespondToText',
        requestStream: false,
        responseStream: false,
        requestType: text_generator_service_pb.Sentence,
        responseType: text_generator_service_pb.Response,
        requestSerialize: serialize_TextGeneratorGRPC_Sentence,
        requestDeserialize: deserialize_TextGeneratorGRPC_Sentence,
        responseSerialize: serialize_TextGeneratorGRPC_Response,
        responseDeserialize: deserialize_TextGeneratorGRPC_Response,
    },
};
exports.TextResponseServiceClient = grpc.makeGenericClientConstructor(TextResponseServiceService);
//# sourceMappingURL=text_generator_service_grpc_pb.js.map