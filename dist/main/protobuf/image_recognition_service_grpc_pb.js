// GENERATED CODE -- DO NOT EDIT!
'use strict';
var grpc = require('grpc');
var image_recognition_service_pb = require('./image_recognition_service_pb.js');
function serialize_ImageRecognitionServiceRPC_ImageRequest(arg) {
    if (!(arg instanceof image_recognition_service_pb.ImageRequest)) {
        throw new Error('Expected argument of type ImageRecognitionServiceRPC.ImageRequest');
    }
    return Buffer.from(arg.serializeBinary());
}
function deserialize_ImageRecognitionServiceRPC_ImageRequest(buffer_arg) {
    return image_recognition_service_pb.ImageRequest.deserializeBinary(new Uint8Array(buffer_arg));
}
function serialize_ImageRecognitionServiceRPC_ImageResponse(arg) {
    if (!(arg instanceof image_recognition_service_pb.ImageResponse)) {
        throw new Error('Expected argument of type ImageRecognitionServiceRPC.ImageResponse');
    }
    return Buffer.from(arg.serializeBinary());
}
function deserialize_ImageRecognitionServiceRPC_ImageResponse(buffer_arg) {
    return image_recognition_service_pb.ImageResponse.deserializeBinary(new Uint8Array(buffer_arg));
}
var ImageRecognitionServiceService = exports.ImageRecognitionServiceService = {
    recognizeImage: {
        path: '/ImageRecognitionServiceRPC.ImageRecognitionService/RecognizeImage',
        requestStream: false,
        responseStream: false,
        requestType: image_recognition_service_pb.ImageRequest,
        responseType: image_recognition_service_pb.ImageResponse,
        requestSerialize: serialize_ImageRecognitionServiceRPC_ImageRequest,
        requestDeserialize: deserialize_ImageRecognitionServiceRPC_ImageRequest,
        responseSerialize: serialize_ImageRecognitionServiceRPC_ImageResponse,
        responseDeserialize: deserialize_ImageRecognitionServiceRPC_ImageResponse,
    },
};
exports.ImageRecognitionServiceClient = grpc.makeGenericClientConstructor(ImageRecognitionServiceService);
//# sourceMappingURL=image_recognition_service_grpc_pb.js.map