// package: ImageClassificationServiceRPC
// file: image_classification_service.proto

/* tslint:disable */

import * as grpc from "grpc";
import * as image_classification_service_pb from "./image_classification_service_pb";

interface IImageClassificationServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    recognizeImage: IImageClassificationServiceService_IRecognizeImage;
}

interface IImageClassificationServiceService_IRecognizeImage extends grpc.MethodDefinition<image_classification_service_pb.ImageRequest, image_classification_service_pb.ImageResponse> {
    path: string; // "/ImageClassificationServiceRPC.ImageClassificationService/RecognizeImage"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<image_classification_service_pb.ImageRequest>;
    requestDeserialize: grpc.deserialize<image_classification_service_pb.ImageRequest>;
    responseSerialize: grpc.serialize<image_classification_service_pb.ImageResponse>;
    responseDeserialize: grpc.deserialize<image_classification_service_pb.ImageResponse>;
}

export const ImageClassificationServiceService: IImageClassificationServiceService;

export interface IImageClassificationServiceServer {
    recognizeImage: grpc.handleUnaryCall<image_classification_service_pb.ImageRequest, image_classification_service_pb.ImageResponse>;
}

export interface IImageClassificationServiceClient {
    recognizeImage(request: image_classification_service_pb.ImageRequest, callback: (error: grpc.ServiceError | null, response: image_classification_service_pb.ImageResponse) => void): grpc.ClientUnaryCall;
    recognizeImage(request: image_classification_service_pb.ImageRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: image_classification_service_pb.ImageResponse) => void): grpc.ClientUnaryCall;
    recognizeImage(request: image_classification_service_pb.ImageRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: image_classification_service_pb.ImageResponse) => void): grpc.ClientUnaryCall;
}

export class ImageClassificationServiceClient extends grpc.Client implements IImageClassificationServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public recognizeImage(request: image_classification_service_pb.ImageRequest, callback: (error: grpc.ServiceError | null, response: image_classification_service_pb.ImageResponse) => void): grpc.ClientUnaryCall;
    public recognizeImage(request: image_classification_service_pb.ImageRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: image_classification_service_pb.ImageResponse) => void): grpc.ClientUnaryCall;
    public recognizeImage(request: image_classification_service_pb.ImageRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: image_classification_service_pb.ImageResponse) => void): grpc.ClientUnaryCall;
}
