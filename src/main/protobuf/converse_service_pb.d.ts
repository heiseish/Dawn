// package: ConverseServiceGRPC
// file: converse_service.proto

/* tslint:disable */

import * as jspb from "google-protobuf";

export class ConversationInput extends jspb.Message { 
    getTransId(): string;
    setTransId(value: string): void;

    getText(): string;
    setText(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ConversationInput.AsObject;
    static toObject(includeInstance: boolean, msg: ConversationInput): ConversationInput.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ConversationInput, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ConversationInput;
    static deserializeBinaryFromReader(message: ConversationInput, reader: jspb.BinaryReader): ConversationInput;
}

export namespace ConversationInput {
    export type AsObject = {
        transId: string,
        text: string,
    }
}

export class ConversationResponse extends jspb.Message { 
    getTransId(): string;
    setTransId(value: string): void;

    getState(): ConversationResponse.State;
    setState(value: ConversationResponse.State): void;

    getText(): string;
    setText(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ConversationResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ConversationResponse): ConversationResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ConversationResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ConversationResponse;
    static deserializeBinaryFromReader(message: ConversationResponse, reader: jspb.BinaryReader): ConversationResponse;
}

export namespace ConversationResponse {
    export type AsObject = {
        transId: string,
        state: ConversationResponse.State,
        text: string,
    }

    export enum State {
    SUCCESS = 0,
    MODEL_ERR = 1,
    UNKNOWN = 2,
    }

}
