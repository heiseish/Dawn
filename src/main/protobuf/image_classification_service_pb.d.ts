// package: ImageClassificationServiceRPC
// file: image_classification_service.proto

/* tslint:disable */

import * as jspb from "google-protobuf";

export class ImageRequest extends jspb.Message { 
    getTransId(): string;
    setTransId(value: string): void;

    getImage(): string;
    setImage(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ImageRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ImageRequest): ImageRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ImageRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ImageRequest;
    static deserializeBinaryFromReader(message: ImageRequest, reader: jspb.BinaryReader): ImageRequest;
}

export namespace ImageRequest {
    export type AsObject = {
        transId: string,
        image: string,
    }
}

export class ImageResponse extends jspb.Message { 
    getTransId(): string;
    setTransId(value: string): void;

    getState(): ImageResponse.State;
    setState(value: ImageResponse.State): void;

    getText(): string;
    setText(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ImageResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ImageResponse): ImageResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ImageResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ImageResponse;
    static deserializeBinaryFromReader(message: ImageResponse, reader: jspb.BinaryReader): ImageResponse;
}

export namespace ImageResponse {
    export type AsObject = {
        transId: string,
        state: ImageResponse.State,
        text: string,
    }

    export enum State {
    SUCCESS = 0,
    MODEL_ERR = 1,
    UNKNOWN = 2,
    }

}
