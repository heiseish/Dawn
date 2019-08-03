// package: TextGeneratorGRPC
// file: text_generator_service.proto

/* tslint:disable */

import * as jspb from "google-protobuf";

export class Sentence extends jspb.Message { 
    getGreeting(): string;
    setGreeting(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Sentence.AsObject;
    static toObject(includeInstance: boolean, msg: Sentence): Sentence.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Sentence, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Sentence;
    static deserializeBinaryFromReader(message: Sentence, reader: jspb.BinaryReader): Sentence;
}

export namespace Sentence {
    export type AsObject = {
        greeting: string,
    }
}

export class Response extends jspb.Message { 
    getReply(): string;
    setReply(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Response.AsObject;
    static toObject(includeInstance: boolean, msg: Response): Response.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Response, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Response;
    static deserializeBinaryFromReader(message: Response, reader: jspb.BinaryReader): Response;
}

export namespace Response {
    export type AsObject = {
        reply: string,
    }
}
