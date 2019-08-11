"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bye_1 = __importDefault(require("./bye"));
const compliment_1 = __importDefault(require("./compliment"));
const greet_1 = __importDefault(require("./greet"));
const help_1 = __importDefault(require("./help"));
const news_1 = __importDefault(require("./news"));
const pkmGo_1 = __importDefault(require("./pkmGo"));
const document_1 = __importDefault(require("./document"));
const unknown_1 = __importDefault(require("./unknown"));
const weather_1 = __importDefault(require("./weather"));
const worldCup_1 = __importDefault(require("./worldCup"));
class ActionInterface {
    constructor() {
        this.map = {};
        this.lst = [];
        this.lst.push(new bye_1.default());
        this.lst.push(new compliment_1.default());
        this.lst.push(new greet_1.default());
        this.lst.push(new help_1.default());
        this.lst.push(new news_1.default());
        this.lst.push(new pkmGo_1.default());
        this.lst.push(new document_1.default());
        this.lst.push(new unknown_1.default());
        this.lst.push(new worldCup_1.default());
        this.lst.push(new weather_1.default());
        for (let item of this.lst) {
            this.map[item.name] = item.execute;
        }
    }
    execute(intent, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(intent);
                let func = this.map[intent];
                if (typeof func !== 'function') {
                    return Promise.reject('Fail to load action interface or unhandled intent');
                }
                return yield func(user);
            }
            catch (e) {
                return Promise.reject(e);
            }
        });
    }
}
exports.default = ActionInterface;
//# sourceMappingURL=index.js.map