"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const perf_hooks_1 = require("perf_hooks");
/**
 * Promisify a function that take in only a callback
 * @param fn
 */
const promisify = (fn) => {
    return new Promise((resolve) => fn(resolve));
};
/**
 * Partially bind argument for function, starting from index
 * @param fn Function to be bound
 * @param n the first n arguments are bound
 * @param boundArgs arguments to be bound
 * @returns a bound function
 */
const bindTrailingArgumentFromNIndex = (fn, n, ...boundArgs) => {
    return (...args) => {
        return fn(...args.slice(0, n - 1), ...boundArgs);
    };
};
exports.bindTrailingArgumentFromNIndex = bindTrailingArgumentFromNIndex;
/**
 * Benchmark for a function that only takes in callback
 * @param fn Function to be benchmarked.
 * @returns execution time
 */
const measureExecutionTimeCallback = (fn) => __awaiter(this, void 0, void 0, function* () {
    const start = process.hrtime();
    const ps = perf_hooks_1.performance.now();
    yield promisify(fn);
    const end = process.hrtime(start);
    return [end[1] / 1000000, perf_hooks_1.performance.now() - ps];
});
exports.measureExecutionTimeCallback = measureExecutionTimeCallback;
/**
 * Measure execution time of an async function
 * @param fn Function to be benchmarked
 * @returns execution times measured by process.hrtime and performance.now
 */
const measureExecutionTimeAsync = (fn) => __awaiter(this, void 0, void 0, function* () {
    const start = process.hrtime();
    const ps = perf_hooks_1.performance.now();
    yield fn();
    const end = process.hrtime(start);
    return [end[1] / 1000000, perf_hooks_1.performance.now() - ps];
});
exports.measureExecutionTimeAsync = measureExecutionTimeAsync;
/**
 * Measure execution time of an async function
 * @param fn Function to be benchmarked
 * @returns execution times measured by process.hrtime and performance.now
 */
const measureExecutionTimeSync = (fn) => {
    const start = process.hrtime();
    const ps = perf_hooks_1.performance.now();
    fn();
    const end = process.hrtime(start);
    return [end[1] / 1000000, perf_hooks_1.performance.now() - ps];
};
exports.measureExecutionTimeSync = measureExecutionTimeSync;
//# sourceMappingURL=benchmark.js.map