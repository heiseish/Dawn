import { expect } from 'chai';
import {
	waitToDo,
} from '../../src/main/utils/timer';

describe('Timer Utils', function() {
	describe('waitToDo()', function() {
		it('Should execute a function after the timer', function() {
			const arr = [1, 'nice'];
			waitToDo(1000, () => {
				arr[0] = 2;
			});
			setTimeout(() => {
				expect(arr)
					.to.be.an('array')
					.and.to.be.deep.equal([2, 'nice']);
			}, 1000);
		});
	});
});
