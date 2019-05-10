"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Check duplicate of a sorted array.
 * @param {T[]} a
 * @return true if there are duplicated. False otherwise
 */
const checkDuplicates = (a) => {
    for (let i = 0; i < a.length - 1; i++) {
        if (a[i] === a[i + 1])
            return true;
    }
    return false;
};
exports.checkDuplicates = checkDuplicates;
/**
 * Check if two arrays has any mutual member
 * @param {T[]} array1
 * @param {T[]} array2
 * @return True if two arrays have mutual elements. False otherwise.
 */
const checkIfArrayMutual = (array1, array2) => {
    return array1.filter(val => array2.includes(val)).length > 0;
};
exports.checkIfArrayMutual = checkIfArrayMutual;
/**
 * Get the list of common members from 2 arrays
 * @param {T[]} a
 * @param {T[]} b
 * @return array containing all the mutual elements
 */
const getCommonMembersFromTwoArrays = (a, b) => a.filter((n) => b.includes(n));
exports.getCommonMembersFromTwoArrays = getCommonMembersFromTwoArrays;
/**
 * shuffle an array based on Fisher-Yates (aka Knuth) Shuffle algorithm
 * @param {T[]} array
 * @return array shuffled
 */
const shuffle = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};
exports.shuffle = shuffle;
/**
 * Return a random member of an array
 * @param {T[]} array
 * @return an element inside the array
 */
const randomIndex = (array) => array[Math.floor(Math.random() * array.length)];
exports.randomIndex = randomIndex;
/**
 * Remove an element from array
 * @param {T[]}array Array to be process
 * @param {T} member elemen to be removed
 * @return a new array that doesn't have the old element
 */
const removeFromArray = (array, member) => {
    const index = array.indexOf(member);
    if (index > -1) {
        array.splice(index, 1);
    }
    return array;
};
exports.removeFromArray = removeFromArray;
//# sourceMappingURL=array.js.map