// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var image_classification_service_pb = require('./image_classification_service_pb.js');

function serialize_ImageClassificationServiceRPC_ImageRequest(arg) {
  if (!(arg instanceof image_classification_service_pb.ImageRequest)) {
    throw new Error('Expected argument of type ImageClassificationServiceRPC.ImageRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ImageClassificationServiceRPC_ImageRequest(buffer_arg) {
  return image_classification_service_pb.ImageRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_ImageClassificationServiceRPC_ImageResponse(arg) {
  if (!(arg instanceof image_classification_service_pb.ImageResponse)) {
    throw new Error('Expected argument of type ImageClassificationServiceRPC.ImageResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ImageClassificationServiceRPC_ImageResponse(buffer_arg) {
  return image_classification_service_pb.ImageResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var ImageClassificationServiceService = exports.ImageClassificationServiceService = {
  recognizeImage: {
    path: '/ImageClassificationServiceRPC.ImageClassificationService/RecognizeImage',
    requestStream: false,
    responseStream: false,
    requestType: image_classification_service_pb.ImageRequest,
    responseType: image_classification_service_pb.ImageResponse,
    requestSerialize: serialize_ImageClassificationServiceRPC_ImageRequest,
    requestDeserialize: deserialize_ImageClassificationServiceRPC_ImageRequest,
    responseSerialize: serialize_ImageClassificationServiceRPC_ImageResponse,
    responseDeserialize: deserialize_ImageClassificationServiceRPC_ImageResponse,
  },
};

exports.ImageClassificationServiceClient = grpc.makeGenericClientConstructor(ImageClassificationServiceService);
