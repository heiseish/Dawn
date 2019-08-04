// package: ImageRecognitionServiceRPC
// file: image_recognition_service.proto

/* tslint:disable */

import * as grpc from "grpc";
import * as image_recognition_service_pb from "./image_recognition_service_pb";

interface IImageRecognitionServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    recognizeImage: IImageRecognitionServiceService_IRecognizeImage;
}

interface IImageRecognitionServiceService_IRecognizeImage extends grpc.MethodDefinition<image_recognition_service_pb.ImageRequest, image_recognition_service_pb.ImageResponse> {
    path: string; // "/ImageRecognitionServiceRPC.ImageRecognitionService/RecognizeImage"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<image_recognition_service_pb.ImageRequest>;
    requestDeserialize: grpc.deserialize<image_recognition_service_pb.ImageRequest>;
    responseSerialize: grpc.serialize<image_recognition_service_pb.ImageResponse>;
    responseDeserialize: grpc.deserialize<image_recognition_service_pb.ImageResponse>;
}

export const ImageRecognitionServiceService: IImageRecognitionServiceService;

export interface IImageRecognitionServiceServer {
    recognizeImage: grpc.handleUnaryCall<image_recognition_service_pb.ImageRequest, image_recognition_service_pb.ImageResponse>;
}

export interface IImageRecognitionServiceClient {
    recognizeImage(request: image_recognition_service_pb.ImageRequest, callback: (error: grpc.ServiceError | null, response: image_recognition_service_pb.ImageResponse) => void): grpc.ClientUnaryCall;
    recognizeImage(request: image_recognition_service_pb.ImageRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: image_recognition_service_pb.ImageResponse) => void): grpc.ClientUnaryCall;
    recognizeImage(request: image_recognition_service_pb.ImageRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: image_recognition_service_pb.ImageResponse) => void): grpc.ClientUnaryCall;
}

export class ImageRecognitionServiceClient extends grpc.Client implements IImageRecognitionServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public recognizeImage(request: image_recognition_service_pb.ImageRequest, callback: (error: grpc.ServiceError | null, response: image_recognition_service_pb.ImageResponse) => void): grpc.ClientUnaryCall;
    public recognizeImage(request: image_recognition_service_pb.ImageRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: image_recognition_service_pb.ImageResponse) => void): grpc.ClientUnaryCall;
    public recognizeImage(request: image_recognition_service_pb.ImageRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: image_recognition_service_pb.ImageResponse) => void): grpc.ClientUnaryCall;
}
