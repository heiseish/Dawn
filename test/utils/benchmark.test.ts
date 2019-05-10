import { expect } from 'chai';
import {
	bindTrailingArgumentFromNIndex,
	measureExecutionTimeAsync,
	measureExecutionTimeCallback,
	measureExecutionTimeSync
} from '../../src/main/utils/benchmark';
/**
* Promisified setTimeOut
* @param ms number of second to sleep
* @returns Promise<void>
*/
const sleep = (ms: number): Promise<void> => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

const sleepSync = (ms: number): void =>  {
	const start = new Date().getTime(), expire = start + ms;
	while (new Date().getTime() < expire) { }
	return;
};
describe('Benchmark Module Test', function() {
	describe('bindTrailingArgumentFromNIndex()', function() {
		it('Should return correct result regardless of order of arguments [2 arguments]', function() {
			const add = (a: number, b: number): number => a + b;
			const partiallyBoundFn = bindTrailingArgumentFromNIndex(add, 2, 2);
			const res: number = partiallyBoundFn(3);
			expect(res)
			.to.be.equal(5);

		});

		it('Should return correct result when passing in function that takes in array like parameter', function() {
			const add = (...args: number[]): number => args.reduce((a: number, b: number) => a + b);
			const partiallyBoundFn = bindTrailingArgumentFromNIndex(add, 2, 1, 2, 3, 2, 1, 2);
			const res: number = partiallyBoundFn(3);
			expect(res)
			.to.be.equal(14);
		});

		it('Should return correct result when order of arguments matters', function() {
			const divide = (a: number, b: number): number => a / b;
			const partiallyBoundFn = bindTrailingArgumentFromNIndex(divide, 2, 5);
			const res: number = partiallyBoundFn(10);
			expect(res)
			.to.be.equal(2);
		});

		it('Should return correct result when arguments of different types', function() {
			const merge = (a: {}, b: number): {} => ({ ...a, id: b});
			const partiallyBoundFn = bindTrailingArgumentFromNIndex(merge, 2, 69);
			const res: number = partiallyBoundFn({name: 'hello'});
			expect(res)
			.to.be.an('object')
			.and.to.be.deep.equal({
				name: 'hello',
				id: 69,
			});
		});
	});

	describe('measureExecutionTimeAsync()', function() {
		const THRESH_HOLD = 0.4;
		it('Should return a promise', async function() {
			const add = async (...args: number[]): Promise<number> => args.reduce((a: number, b: number) => a * b);
			const res = measureExecutionTimeAsync(add.bind(null, 2, 3, 4, 5, 6, 9, 1, 2 , 3 , 4, 5, 1, 2 , 34, 1, 2));
			expect(res).to.be.an('promise');
		});

		it('Should return 2 numbers representing execution time of an async function', async function() {
			const add = async (...args: number[]): Promise<number> => args.reduce((a: number, b: number) => a * b);
			const res = await measureExecutionTimeAsync(add.bind(null, 2, 3, 4, 5, 6, 9, 1, 2 , 3 , 4, 5, 1, 2 , 34, 1, 2));
			expect(res)
			.to.be.an('array')
			.and.to.have.lengthOf(2);
		});

		it(`Should return highly accurate execution number by process.hr ${THRESH_HOLD * 100}% within the \
		correct execution time`, async function() {
			const SLEEP_TIME = 10;
			const res = await measureExecutionTimeAsync(sleep.bind(null, SLEEP_TIME));
			expect(res)
			.to.be.an('array')
			.and.to.have.lengthOf(2);
			expect(res[0])
			.to.be.a('number')
			.and.to.be.within(SLEEP_TIME - THRESH_HOLD * SLEEP_TIME, SLEEP_TIME + THRESH_HOLD * SLEEP_TIME);

		});

		it(`Should return highly accurate execution number by performance.now ${THRESH_HOLD * 100}% within the \
		correct execution time`, async function() {
			const SLEEP_TIME = 10;
			const res = await measureExecutionTimeAsync(sleep.bind(null, SLEEP_TIME));
			expect(res)
			.to.be.an('array')
			.and.to.have.lengthOf(2);
			expect(res[1])
			.to.be.a('number')
			.and.to.be.within(SLEEP_TIME - THRESH_HOLD * SLEEP_TIME, SLEEP_TIME + THRESH_HOLD * SLEEP_TIME);

		});

	});

	describe('measureExecutionTimeSync()', function() {
		const THRESH_HOLD = 0.4;

		it('Should return 2 numbers representing execution time of an sync function', function() {
			const add = (...args: number[]): number => args.reduce((a: number, b: number) => a * b);
			const res =  measureExecutionTimeSync(add.bind(null, 2, 3, 4, 5, 6, 9, 1, 2 , 3 , 4, 5, 1, 2 , 34, 1, 2));
			expect(res)
			.to.be.an('array')
			.and.to.have.lengthOf(2);
		});

		it(`Should return highly accurate execution number by process.hr ${THRESH_HOLD * 100}% within the \
		correct execution time`,  function() {
			const SLEEP_TIME = 10;
			const res =  measureExecutionTimeSync(sleepSync.bind(null, SLEEP_TIME));
			expect(res)
			.to.be.an('array')
			.and.to.have.lengthOf(2);
			expect(res[0])
			.to.be.a('number')
			.and.to.be.within(SLEEP_TIME - THRESH_HOLD * SLEEP_TIME, SLEEP_TIME + THRESH_HOLD * SLEEP_TIME);

		});

		it(`Should return highly accurate execution number by performance.now ${THRESH_HOLD * 100}% within the \
		correct execution time`,  function() {
			const SLEEP_TIME = 10;
			const res =  measureExecutionTimeSync(sleepSync.bind(null, SLEEP_TIME));
			expect(res)
			.to.be.an('array')
			.and.to.have.lengthOf(2);
			expect(res[1])
			.to.be.a('number')
			.and.to.be.within(SLEEP_TIME - THRESH_HOLD * SLEEP_TIME, SLEEP_TIME + THRESH_HOLD * SLEEP_TIME);

		});

	});

	describe('measureExecutionTimeCallback()', function() {
		const THRESH_HOLD = 0.4;
		it('Should return a promise', async function() {
			const add = (cb: Function, ...args: number[]): number => {
				const a: number = args.reduce((a: number, b: number) => a * b);
				cb();
				return a;
			};
			const partiallyBoundFn = bindTrailingArgumentFromNIndex(add, 2, 1, 2, 3, 2, 1, 2);
			const res =  measureExecutionTimeCallback(partiallyBoundFn);
			expect(res)
			.to.be.an('promise');
		});

		it('Should return 2 numbers representing execution time of an callback function', async function() {
			const add = (cb: Function, ...args: number[]): number => {
				const a: number = args.reduce((a: number, b: number) => a * b);
				cb();
				return a;
			};
			const partiallyBoundFn = bindTrailingArgumentFromNIndex(add, 2, 1, 2, 3, 2, 1, 2);
			const res =  await measureExecutionTimeCallback(partiallyBoundFn);
			expect(res)
			.to.be.an('array')
			.and.to.have.lengthOf(2);
		});

		it(`Should return highly accurate execution number by process.hr ${THRESH_HOLD * 100}% within the \
		correct execution time`, async function() {
			const SLEEP_TIME = 10;
			const partiallyBoundFn = bindTrailingArgumentFromNIndex(setTimeout, 2, SLEEP_TIME);
			const res =  await measureExecutionTimeCallback(partiallyBoundFn);
			expect(res)
			.to.be.an('array')
			.and.to.have.lengthOf(2);
			expect(res[0])
			.to.be.a('number')
			.and.to.be.within(SLEEP_TIME - THRESH_HOLD * SLEEP_TIME, SLEEP_TIME + THRESH_HOLD * SLEEP_TIME);
		});

		it(`Should return highly accurate execution number by performance.now ${THRESH_HOLD * 100}% within the \
		correct execution time`,  async function() {
			const SLEEP_TIME = 10;
			const partiallyBoundFn = bindTrailingArgumentFromNIndex(setTimeout, 2, SLEEP_TIME);
			const res =  await measureExecutionTimeCallback(partiallyBoundFn);
			expect(res)
			.to.be.an('array')
			.and.to.have.lengthOf(2);
			expect(res[1])
			.to.be.a('number')
			.and.to.be.within(SLEEP_TIME - THRESH_HOLD * SLEEP_TIME, SLEEP_TIME + THRESH_HOLD * SLEEP_TIME);
		});

	});
});
