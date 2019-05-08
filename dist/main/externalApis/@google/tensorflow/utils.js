"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const allASCIIletters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ .,;'";
const numLetters = allASCIIletters.length;
/**
 * Convert intent number to string
 * @param {number} n Number to intent
 * @return {string} intent
 */
const toWordIntent = (n) => {
    switch (n) {
        case 0:
            return 'greetings';
        case 1:
            return 'thanks';
        case 2:
            return 'bye';
        case 3:
            return 'news';
        case 4:
            return 'weather';
        case 5:
            return 'worldCup';
        case 6:
            return 'pkmGO';
        case 7:
            return 'help';
        case 8:
            return 'compliment';
    }
};
exports.toWordIntent = toWordIntent;
/**
 * Vector array with absolute index of 1-hot vectors
 * @param {Array<number>} sentence of index
 * @return {Array<Array<number>>} array of 1-hot vector
 */
const sentenceToOneHotVectors = (sentence) => {
    const res = [];
    for (const idx of sentence) {
        const arr = new Array(numLetters + 1).fill(0);
        arr[idx] = 1;
        res.push(arr);
    }
    return res;
};
/**
 * Convert letter to index based on allASCIIletters
 * @param {string} letter
 */
const letterToIndex = (letter) => allASCIIletters.indexOf(letter) + 1;
/**
 * Convert sentence to array of indices
 * @param sentence
 */
const sentenceToIndex = (sentence) => {
    const res = [];
    for (let i = 0; i < sentence.length; i++) {
        res.push(letterToIndex(sentence[i]));
    }
    return res;
};
/**
 * Create a 2-D array of 0z
 * @param row number of row
 * @param col number of col
 */
const zeros = (row, col) => Array.from(Array(row), (_) => Array(col).fill(0));
/**
 * embed the original string with one-hot vector and 0-filling
 * @param X original string
 */
const characterLevelEmbed = (X) => {
    const x = X.toLowerCase();
    const xIndices = sentenceToIndex(X);
    const ohVector = sentenceToOneHotVectors(xIndices);
    const toConcat = zeros(100 - x.length, numLetters + 1);
    return ohVector.concat(toConcat);
};
exports.characterLevelEmbed = characterLevelEmbed;
//# sourceMappingURL=utils.js.map