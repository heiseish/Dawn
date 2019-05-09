"use strict";
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
const sendDocument_1 = __importDefault(require("./sendDocument"));
const thanks_1 = __importDefault(require("./thanks"));
const weather_1 = __importDefault(require("./weather"));
const worldCup_1 = __importDefault(require("./worldCup"));
const actions = [
    {
        name: 'greetings',
        execute: greet_1.default,
        description: 'Greet people.',
    },
    {
        name: 'worldCup',
        execute: worldCup_1.default,
        description: 'Return World Cup schedule for today!',
    },
    {
        name: 'news',
        execute: news_1.default,
        description: 'Show some top news headlines!',
    },
    {
        name: 'compliment',
        execute: compliment_1.default,
        description: 'Reply to people paying compliment',
    },
    {
        name: 'bye',
        execute: bye_1.default,
        description: 'Reply to people bidding good bye',
    },
    {
        name: 'thanks',
        execute: thanks_1.default,
        description: 'Reply to people thanking',
    },
    {
        name: 'sendDocument',
        execute: sendDocument_1.default,
        description: 'Reply to people sending files',
    },
    {
        name: 'weather',
        execute: weather_1.default,
        description: 'Forecast weather',
    },
    {
        name: 'pkmGO',
        execute: pkmGo_1.default,
        description: 'Show latest tweets by Pokemon Go on Twitter.',
    },
    {
        name: 'help',
        execute: help_1.default,
        description: 'Return help manual for the bot.',
    },
];
exports.default = actions;
//# sourceMappingURL=index.js.map