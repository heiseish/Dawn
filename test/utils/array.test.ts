import { expect } from 'chai';
import {
	checkDuplicates,
	checkIfArrayMutual,
	getCommonMembersFromTwoArrays,
	randomIndex,
	removeFromArray,
	shuffle,
} from '../../src/main/utils/array';

describe('Array Utils', function() {
	describe('checkDuplicates()', function() {
		it('Should return true for a sorted array with duplicates', function() {
			const sortedArray = [1, 2, 2, 5, 1020, 1231];
			expect(checkDuplicates(sortedArray))
				.to.be.a('boolean')
				.and.to.be.equal(true);
		});

		it('Should return false for a sorted array without duplicates' , function() {
			const sortedArray = [1, 2, 4, 5, 1020, 1231];
			expect(checkDuplicates(sortedArray))
				.to.be.a('boolean')
				.and.to.be.equal(false);
		});
	});

	describe('checkIfArrayMutual()', function() {
		it('Should return true for arrays with mutual element' , function() {
			const array1 = [1, 2, 4, 5, 1020, 1231];
			const array2 = [12, 1020, 1231, 10201, 201012];
			const res = checkIfArrayMutual(array1, array2);
			expect(res)
				.to.be.a('boolean')
				.and.to.be.equal(true);
		});

		it('Should return false for arrays without mutual element' , function() {
			const array1 = [1, 2, 4, 5, 1021, 1231];
			const array2 = [12, 1020, 1020, 10201, 201012];
			const res = checkIfArrayMutual(array1, array2);
			expect(res)
				.to.be.a('boolean')
				.and.to.be.equal(false);
		});
	});

	describe('getCommonMembersFromTwoArrays()', function() {
		it('Should return the common elements from 2 array' , function() {
			const array1 = [1, 2, 4, 5, 1020, 1231];
			const array2 = [12, 1020, 1231, 10201, 201012];
			const res = getCommonMembersFromTwoArrays(array1, array2);
			expect(res)
				.to.be.an('array')
				.with.length(2)
				.and.to.be.deep.equal([1020, 1231]);
		});
	});

	describe('shuffle()', function() {
		const array = [1, 2, 4, 5, 1020, 1231];
		const res = shuffle(array);
		it('Should return an array with equal length' , function() {
			expect(res)
				.to.be.an('array')
				.with.length(array.length);
		});

		it('Should contains the same element as the original array' , function() {
			expect(res.sort())
				.to.be.deep.equal(array.sort());
		});
	});

	describe('randomIndex()', function() {
		const array = [1, 2, 4, 5, 1020, 1231];
		const res = randomIndex(array);
		it('Should return a random element' , function() {
			expect(res)
				.to.be.a('number');
		});

		it('Should return an element from the original array' , function() {
			expect(array).to.contain(res);
		});
	});

	describe('removeFromArray()', function() {
		const array = [1, 2, 4, 5, 1020, 1231];
		const res = removeFromArray(array, 4);
		it('Should return an array' , function() {
			expect(res)
				.to.be.an('array');
		});

		it('Array should not contain values to be removed' , function() {
			expect(res).that.not.contain(4);
		});
	});
});
