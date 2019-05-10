import { performance } from 'perf_hooks';

/**
 * Promisify a function that take in only a callback
 * @param fn
 */
const promisify = (fn: Function): Promise<void> => {
	return new Promise((resolve) => fn(resolve));
};
/**
 * Partially bind argument for function, starting from index
 * @param fn Function to be bound
 * @param n the first n arguments are bound
 * @param boundArgs arguments to be bound
 * @returns a bound function
 */
const bindTrailingArgumentFromNIndex = (fn: Function, n: number, ...boundArgs: any[]): Function => {
    return (...args: any[]): any => {
        return fn(...args.slice(0, n - 1), ...boundArgs);
    };
};

/**
 * Benchmark for a function that only takes in callback
 * @param fn Function to be benchmarked.
 * @returns execution time
 */
const measureExecutionTimeCallback = async (fn: Function): Promise<[number, number]> => {
	const start: [number, number] = process.hrtime();
	const ps = performance.now();
	await promisify(fn);
	const end: [number, number] = process.hrtime(start);
	return [end[1] / 1000000,  performance.now() - ps];
};

/**
 * Measure execution time of an async function
 * @param fn Function to be benchmarked
 * @returns execution times measured by process.hrtime and performance.now
 */
const measureExecutionTimeAsync = async (fn: Function): Promise<[number, number]> => {
	const start: [number, number] = process.hrtime();
	const ps = performance.now();
	await fn();
	const end: [number, number] = process.hrtime(start);
	return [end[1] / 1000000,  performance.now() - ps];
};

/**
 * Measure execution time of an async function
 * @param fn Function to be benchmarked
 * @returns execution times measured by process.hrtime and performance.now
 */
const measureExecutionTimeSync = (fn: Function): [number, number] => {
	const start: [number, number] = process.hrtime();
	const ps = performance.now();
	fn();
	const end: [number, number] = process.hrtime(start);
	return [end[1] / 1000000,  performance.now() - ps];
};

export {
	bindTrailingArgumentFromNIndex,
	measureExecutionTimeAsync,
	measureExecutionTimeSync,
	measureExecutionTimeCallback
};
