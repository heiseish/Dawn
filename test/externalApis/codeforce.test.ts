import { getUserRating }  from '../../src/main/externalApis/codeforce'
import { expect } from 'chai'
import { CODEFORCE_API_RESPONSE_TIME } from '../data/api'
const MOCK_HANLE1 = 'DmitriyH'
const MOCK_HANDLE2 = 'Fefer_Ivan'

const USER1_RATING = 1906
const USER1_RANK = 'candidate master'

const USER2_RATING = 2240
const USER2_RANK = 'master'

const useInTest = (): void => {
	before(async function getCodeforcesResult() {
		this.user1 = await getUserRating(MOCK_HANLE1)
		this.user2 = await getUserRating(MOCK_HANDLE2)
	})
}

describe('Codeforce Api ⌨️', function () {
	this.timeout(CODEFORCE_API_RESPONSE_TIME)
	useInTest()

	describe('getUserRating()',  function () {
		it('Should get a ranking object',  function() {
			expect(this.user1)
			.to.be.an('object')

			expect(this.user2)
			.to.be.an('object')
		})
		

		it('Should return a different ranking object for each user',  function() {
			expect(this.user1)
			.to.not.be.deep.equal(this.user2)
		})

		it('Returned object should have rating property', function() {
			expect(this.user1)
			.to.have.property('rating')
			.that.is.a('number')
			.and.to.be.equal(USER1_RATING)

			expect(this.user2)
			.to.have.property('rating')
			.that.is.a('number')
			.and.to.be.equal(USER2_RATING)
		})
		
		it('Returned object should have rank property', function() {
			expect(this.user1)
			.to.have.property('rank')
			.that.is.a('string')
			.and.to.be.equal(USER1_RANK)

			expect(this.user2)
			.to.have.property('rank')
			.that.is.a('string')
			.and.to.be.equal(USER2_RANK)
		})
	})
})