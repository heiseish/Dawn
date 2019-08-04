// package: ConverseServiceGRPC
// file: converse_service.proto

/* tslint:disable */

import * as grpc from "grpc";
import * as converse_service_pb from "./converse_service_pb";

interface IConverseServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    respondToText: IConverseServiceService_IRespondToText;
}

interface IConverseServiceService_IRespondToText extends grpc.MethodDefinition<converse_service_pb.ConversationInput, converse_service_pb.ConversationResponse> {
    path: string; // "/ConverseServiceGRPC.ConverseService/RespondToText"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<converse_service_pb.ConversationInput>;
    requestDeserialize: grpc.deserialize<converse_service_pb.ConversationInput>;
    responseSerialize: grpc.serialize<converse_service_pb.ConversationResponse>;
    responseDeserialize: grpc.deserialize<converse_service_pb.ConversationResponse>;
}

export const ConverseServiceService: IConverseServiceService;

export interface IConverseServiceServer {
    respondToText: grpc.handleUnaryCall<converse_service_pb.ConversationInput, converse_service_pb.ConversationResponse>;
}

export interface IConverseServiceClient {
    respondToText(request: converse_service_pb.ConversationInput, callback: (error: grpc.ServiceError | null, response: converse_service_pb.ConversationResponse) => void): grpc.ClientUnaryCall;
    respondToText(request: converse_service_pb.ConversationInput, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: converse_service_pb.ConversationResponse) => void): grpc.ClientUnaryCall;
    respondToText(request: converse_service_pb.ConversationInput, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: converse_service_pb.ConversationResponse) => void): grpc.ClientUnaryCall;
}

export class ConverseServiceClient extends grpc.Client implements IConverseServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public respondToText(request: converse_service_pb.ConversationInput, callback: (error: grpc.ServiceError | null, response: converse_service_pb.ConversationResponse) => void): grpc.ClientUnaryCall;
    public respondToText(request: converse_service_pb.ConversationInput, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: converse_service_pb.ConversationResponse) => void): grpc.ClientUnaryCall;
    public respondToText(request: converse_service_pb.ConversationInput, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: converse_service_pb.ConversationResponse) => void): grpc.ClientUnaryCall;
}
