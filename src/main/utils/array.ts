/**
 * Check duplicate of a sorted array.
 * @param {any[]} a
 * @return true if there are duplicated. False otherwise
 */
const checkDuplicates = (a: any[]): boolean => {
	for (let i = 0; i < a.length - 1; i++) {
		if (a[i] === a[i + 1]) { return true; }
	}
	return false;
};
/**
 * Check if two arrays has any mutual member
 * @param {any[]} array1
 * @param {any[]} array2
 * @return True if two arrays have mutual elements. False otherwise.
 */
const checkIfArrayMutual = (array1: any[], array2: any[]) => {
	return array1.filter((value) => -1 !== array2.indexOf(value)).length > 0;
};

/**
 * Get the list of common members from 2 arrays
 * @param {any[]} a
 * @param {any[]} b
 * @return array containing all the mutual elements
 */
const getCommonMembersFromTwoArrays = (a: any[], b: any[]): any[] => a.filter((n) => b.indexOf(n) !== -1 );

/**
 * shuffle an array based on Fisher-Yates (aka Knuth) Shuffle algorithm
 * @param {any[]} array
 * @return array shuffled
 */
const shuffle = (array: any[]): any[] => {
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
 * @param {any[]} array
 * @return an element inside the array
 */
const randomIndex = <T extends {}>(array: T[]) => array[Math.floor(Math.random() * array.length)];

/**
 * Remove an element from array
 * @param {any[]}array Array to be process
 * @param {any} member elemen to be removed
 * @return a new array that doesn't have the old element
 */
const removeFromArray  = <T extends {}>(array: T[], member: T) => {
	const index = array.indexOf(member);
	if (index > -1) { array.splice(index, 1); }
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
