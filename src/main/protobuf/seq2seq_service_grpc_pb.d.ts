// package: Seq2SeqGRPC
// file: seq2seq_service.proto

/* tslint:disable */

import * as grpc from "grpc";
import * as seq2seq_service_pb from "./seq2seq_service_pb";

interface ISeq2SeqServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    respondToText: ISeq2SeqServiceService_IRespondToText;
}

interface ISeq2SeqServiceService_IRespondToText extends grpc.MethodDefinition<seq2seq_service_pb.ConversationInput, seq2seq_service_pb.ConversationResponse> {
    path: string; // "/Seq2SeqGRPC.Seq2SeqService/RespondToText"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<seq2seq_service_pb.ConversationInput>;
    requestDeserialize: grpc.deserialize<seq2seq_service_pb.ConversationInput>;
    responseSerialize: grpc.serialize<seq2seq_service_pb.ConversationResponse>;
    responseDeserialize: grpc.deserialize<seq2seq_service_pb.ConversationResponse>;
}

export const Seq2SeqServiceService: ISeq2SeqServiceService;

export interface ISeq2SeqServiceServer {
    respondToText: grpc.handleUnaryCall<seq2seq_service_pb.ConversationInput, seq2seq_service_pb.ConversationResponse>;
}

export interface ISeq2SeqServiceClient {
    respondToText(request: seq2seq_service_pb.ConversationInput, callback: (error: grpc.ServiceError | null, response: seq2seq_service_pb.ConversationResponse) => void): grpc.ClientUnaryCall;
    respondToText(request: seq2seq_service_pb.ConversationInput, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: seq2seq_service_pb.ConversationResponse) => void): grpc.ClientUnaryCall;
    respondToText(request: seq2seq_service_pb.ConversationInput, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: seq2seq_service_pb.ConversationResponse) => void): grpc.ClientUnaryCall;
}

export class Seq2SeqServiceClient extends grpc.Client implements ISeq2SeqServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public respondToText(request: seq2seq_service_pb.ConversationInput, callback: (error: grpc.ServiceError | null, response: seq2seq_service_pb.ConversationResponse) => void): grpc.ClientUnaryCall;
    public respondToText(request: seq2seq_service_pb.ConversationInput, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: seq2seq_service_pb.ConversationResponse) => void): grpc.ClientUnaryCall;
    public respondToText(request: seq2seq_service_pb.ConversationInput, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: seq2seq_service_pb.ConversationResponse) => void): grpc.ClientUnaryCall;
}
