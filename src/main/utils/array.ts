/**
 * Check duplicate of a sorted array.
 * @param {T[]} a
 * @return true if there are duplicated. False otherwise
 */
const checkDuplicates = <T>(a: T[]): boolean => {
	for (let i = 0; i < a.length - 1; i++) {
		if (a[i] === a[i + 1]) return true;
	}
	return false;
};
/**
 * Check if two arrays has any mutual member
 * @param {T[]} array1
 * @param {T[]} array2
 * @return True if two arrays have mutual elements. False otherwise.
 */
const checkIfArrayMutual = <T>(array1: T[], array2: T[]):boolean => {
	return array1.filter(val => array2.includes(val)).length > 0;
};

/**
 * Get the list of common members from 2 arrays
 * @param {T[]} a
 * @param {T[]} b
 * @return array containing all the mutual elements
 */
const getCommonMembersFromTwoArrays = <T>(a: T[], b: T[]): T[] => a.filter((n: T) => b.includes(n) );

/**
 * shuffle an array based on Fisher-Yates (aka Knuth) Shuffle algorithm
 * @param {T[]} array
 * @return array shuffled
 */
const shuffle = <T>(array: T[]): T[] => {
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

/**
 * Return a random member of an array
 * @param {T[]} array
 * @return an element inside the array
 */
const randomIndex = <T extends {}>(array: T[]) => array[Math.floor(Math.random() * array.length)];

/**
 * Remove an element from array
 * @param {T[]}array Array to be process
 * @param {T} member elemen to be removed
 * @return a new array that doesn't have the old element
 */
const removeFromArray  = <T extends {}>(array: T[], member: T):T[] => {
	const index = array.indexOf(member);
	if (index > -1) { 
		array.splice(index, 1); 
	}
	return array;
};
export {
	checkDuplicates,
	checkIfArrayMutual,
	shuffle,
	getCommonMembersFromTwoArrays,
	randomIndex,
	removeFromArray,
};
