// package: TextGeneratorGRPC
// file: text_generator_service.proto

/* tslint:disable */

import * as grpc from "grpc";
import * as text_generator_service_pb from "./text_generator_service_pb";

interface ITextResponseServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    respondToText: ITextResponseServiceService_IRespondToText;
}

interface ITextResponseServiceService_IRespondToText extends grpc.MethodDefinition<text_generator_service_pb.Sentence, text_generator_service_pb.Response> {
    path: string; // "/TextGeneratorGRPC.TextResponseService/RespondToText"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<text_generator_service_pb.Sentence>;
    requestDeserialize: grpc.deserialize<text_generator_service_pb.Sentence>;
    responseSerialize: grpc.serialize<text_generator_service_pb.Response>;
    responseDeserialize: grpc.deserialize<text_generator_service_pb.Response>;
}

export const TextResponseServiceService: ITextResponseServiceService;

export interface ITextResponseServiceServer {
    respondToText: grpc.handleUnaryCall<text_generator_service_pb.Sentence, text_generator_service_pb.Response>;
}

export interface ITextResponseServiceClient {
    respondToText(request: text_generator_service_pb.Sentence, callback: (error: grpc.ServiceError | null, response: text_generator_service_pb.Response) => void): grpc.ClientUnaryCall;
    respondToText(request: text_generator_service_pb.Sentence, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: text_generator_service_pb.Response) => void): grpc.ClientUnaryCall;
    respondToText(request: text_generator_service_pb.Sentence, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: text_generator_service_pb.Response) => void): grpc.ClientUnaryCall;
}

export class TextResponseServiceClient extends grpc.Client implements ITextResponseServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public respondToText(request: text_generator_service_pb.Sentence, callback: (error: grpc.ServiceError | null, response: text_generator_service_pb.Response) => void): grpc.ClientUnaryCall;
    public respondToText(request: text_generator_service_pb.Sentence, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: text_generator_service_pb.Response) => void): grpc.ClientUnaryCall;
    public respondToText(request: text_generator_service_pb.Sentence, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: text_generator_service_pb.Response) => void): grpc.ClientUnaryCall;
}
