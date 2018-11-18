import { expect } from 'chai'
import getRandomGif from '../../src/main/externalApis/giphy'
import { GIPHY_RESPONSE_TIME } from '../data/api'

describe('Giphy API 🖼', function() {
	this.timeout(GIPHY_RESPONSE_TIME)
	describe('getRandomGif()', function() {
		it('Should return a random gif', async function() {
			const res = await getRandomGif()
			expect(res)
				.to.be.a('string')
				.that.contain('https://')
				.and.contain('giphy.com/media')
				.and.contain('giphy.gif')
		})
	})
})
