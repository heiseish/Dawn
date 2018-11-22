import getDailyNasaNews  from '../../src/main/externalApis/@nasa'
import { expect } from 'chai'
import { NASA_API_RESPONSE_TIME } from '../data/api'

const useInTest = (): void => {
	before(async function getNASANews() {
		this.nasa = await getDailyNasaNews()
	})
}

describe('NASA Api 🌌', function () {
	this.timeout(NASA_API_RESPONSE_TIME)
	useInTest()

	describe('getDailyNasaNews()',  function () {
		it('Should get a daily nasa pic',  function() {
			expect(this.nasa)
			.to.be.an('object')
		})
		
		it('Returned object should have copyright property', function() {
			expect(this.nasa)
			.to.have.property('copyright')
			.that.is.a('string')
		})
		
		it('Returned object should have url property', function() {
			expect(this.nasa)
			.to.have.property('url')
			.that.is.a('string')
		})
		
		it('Returned object should have media_type property', function() {
			expect(this.nasa)
			.to.have.property('media_type')
			.that.is.a('string')
		})
		
		it('Returned object should have explanation property', function() {
			expect(this.nasa)
			.to.have.property('explanation')
			.that.is.a('string')
		})
		
		it('Returned object should have title property', function() {
			expect(this.nasa)
			.to.have.property('title')
			.that.is.a('string')
		})
	})
})