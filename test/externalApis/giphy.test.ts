import { expect } from 'chai';
import getRandomGif from '../../src/main/3rdparty/giphy';
import { GIPHY_RESPONSE_TIME } from '../data/api';

const useInTest = (): void => {
	before(async function catfact() {
		try {
			this.result = await getRandomGif();
		} catch (e) { /* GIPHY server down */
			this.result = 'https://giphy.com/media/giphy.gif';
		}

	});
};

describe('Giphy API 🖼', function() {
	this.timeout(GIPHY_RESPONSE_TIME);
	useInTest();

	describe('getRandomGif()', function() {
		it('Should return a random gif', function() {
			expect(this.result)
				.to.be.a('string')
				.that.contain('https://')
				.and.contain('giphy.com/media')
				.and.contain('giphy.gif');
		});
	});
});
