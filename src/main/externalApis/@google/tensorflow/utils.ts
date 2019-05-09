const allASCIIletters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ .,;'";
const numLetters: number = allASCIIletters.length;
/**
 * Convert intent number to string
 * @param {number} n Number to intent
 * @return {string} intent
 */
const toWordIntent = (n: number): string => {
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

/**
 * Vector array with absolute index of 1-hot vectors
 * @param {number[]} sentence of index
 * @return {number[][]} array of 1-hot vector (2-D array)
 */
const sentenceToOneHotVectors = (sentence: number[]): number[][] => {
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
 * @returns numeric index
 */
const letterToIndex = (letter: string): number =>  allASCIIletters.indexOf(letter) + 1;

/**
 * Convert sentence to array of indices
 * @param sentence
 * @return array of numeric indexes
 */
const sentenceToIndex = (sentence: string): number[] => {
	const res = [];
	for (let i = 0; i < sentence.length; i++) { res.push(letterToIndex(sentence[i])); }
	return res;
};

/**
 * Create a 2-D array of 0z
 * @param row number of row
 * @param col number of col
 */
const zeros = (row: number, col: number): number[][] => Array.from(Array(row), (_) => Array(col).fill(0));

/**
 * embed the original string with one-hot vector and 0-filling
 * @param X original string
 */
const characterLevelEmbed = (X: string): number[][] => {
	const x: string = X.toLowerCase();
	const xIndices: number[] = sentenceToIndex(X);
	const ohVector: number[][] = sentenceToOneHotVectors(xIndices);
	const toConcat: number[][] = zeros(100 - x.length, numLetters + 1);
	return ohVector.concat(toConcat);
};
export {
	toWordIntent,
	characterLevelEmbed,
};
