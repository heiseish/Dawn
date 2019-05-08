/**
 * Wait for a certain amount to time to execute some function. Clean up version of setTimeOut
 * @param {number} time Amount of miniseconds to wait
 * @param {Function} cb callback function to wait}
 */
const waitToDo = (time: number, cb: () => void): void => {
	setTimeout(() =>  {
		cb();
	}, time);
};

export {
	waitToDo,
};
