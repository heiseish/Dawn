"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
// function to encode file data to base64 encoded string
const base64Encode = (file) => {
    // read binary data
    var bitmap = fs_1.default.readFileSync(file);
    // convert binary data to base64 encoded string
    return Buffer.from(bitmap).toString('base64');
};
exports.base64Encode = base64Encode;
// function to create file from base64 encoded string
const base64Decode = (base64str, file) => {
    // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
    var bitmap = new Buffer(base64str, 'base64');
    // write buffer to file
    fs_1.default.writeFileSync(file, bitmap);
    console.log('******** File created from base64 encoded string ********');
};
exports.base64Decode = base64Decode;
//# sourceMappingURL=image.js.map