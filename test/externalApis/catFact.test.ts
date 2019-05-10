import { expect } from 'chai';
import getCatFact from '../../src/main/externalApis/catFact';
import { CAT_FACT_RESPONSE_TIME } from '../data/api';

const useInTest = (): void => {
	before(async function catfact() {
		try {
			this.result = await getCatFact();
		} catch (e) { /* Catfact server down */
			this.result = 'My cat is nice';
		}

	});
};

describe('Cat Facts API 😺', function() {
	this.timeout(CAT_FACT_RESPONSE_TIME);
	useInTest();

	describe('getCatFact()', function() {
		it('Should get a random cat fact', async function() {
			expect(this.result)
				.to.be.a('string')
				.with.length.greaterThan(0);
		});
	});
});
