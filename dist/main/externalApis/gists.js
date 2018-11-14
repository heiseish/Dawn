"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gists_1 = __importDefault(require("gists"));
const environment_1 = require("../environment");
const gists = new gists_1.default({
    username: environment_1.GIT_ID,
    password: environment_1.GIT_PW,
});
const editGist = (opts) => {
    return new Promise((resolve, reject) => {
        gists.edit(opts, (err, res) => {
            if (err)
                reject(err);
            else
                resolve(res);
        });
    });
};
exports.editGist = editGist;
const createGist = (opts) => {
    return new Promise((resolve, reject) => {
        gists.create(opts, (err, res) => {
            if (err)
                reject(err);
            else
                resolve(res);
        });
    });
};
exports.createGist = createGist;
//# sourceMappingURL=gists.js.map