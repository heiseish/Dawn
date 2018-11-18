import { expect } from 'chai'
import getCatFact from '../../src/main/externalApis/catFact'
import { CAT_FACT_RESPONSE_TIME } from '../data/api'

describe('Cat Facts API 😺', function() {
	this.timeout(CAT_FACT_RESPONSE_TIME)
	describe('getCatFact()', function() {
		it('Should get a random cat fact', async function() {
			const res = await getCatFact()
			expect(res)
				.to.be.a('string')
				.with.length.greaterThan(0)
		})
	})
})
