"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const tf = __importStar(require("@tensorflow/tfjs"));
require("@tensorflow/tfjs-node");
const utils_1 = require("./utils");
let model = null;
const MODEL_FILE_PATH = 'file://dist/main/externalApis/@google/tensorflow/model.json';
/**
 * Predict the intent of a message
 * @param {string} s
 * @return {{intent: string, confidence: number}}
 */
const predict = (s) => __awaiter(this, void 0, void 0, function* () {
    try {
        if (!model)
            model = yield tf.loadLayersModel(MODEL_FILE_PATH);
        const x = [];
        x.push(utils_1.characterLevelEmbed(s));
        const inputTensor = tf.tensor3d(x);
        const res = yield model.predict(inputTensor);
        const possibility = Array.from(res.dataSync());
        const maxIdx = Math.max(...possibility);
        const idx = possibility.indexOf(maxIdx);
        const intent = utils_1.toWordIntent(idx);
        return {
            intent,
            confidence: maxIdx,
        };
    }
    catch (e) {
        return Promise.reject(e);
    }
});
exports.predict = predict;
//# sourceMappingURL=intentClassification.js.map