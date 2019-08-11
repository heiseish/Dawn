import fs from 'fs';
// function to encode file data to base64 encoded string
const base64Encode = (file: string):string => {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return Buffer.from(bitmap).toString('base64');
}

// function to create file from base64 encoded string
const base64Decode = (base64str:string , file:string):void => {
    // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
    var bitmap = new Buffer(base64str, 'base64');
    // write buffer to file
    fs.writeFileSync(file, bitmap);
    console.log('******** File created from base64 encoded string ********');
}

export  {
    base64Encode,
    base64Decode
}