import { expect } from 'chai';
import { getUserRating }  from '../../src/main/3rdparty/codeforce';
import { CODEFORCE_API_RESPONSE_TIME } from '../data/api';
const MOCK_HANLE1 = 'BetterThanNobita';
const MOCK_HANDLE2 = 'giangdao';

const useInTest = (): void => {
	before(async function getCodeforcesResult() {
		try {
			this.user1 = await getUserRating(MOCK_HANLE1);
			this.user2 = await getUserRating(MOCK_HANDLE2);
		} catch (e) { /* Codeforce server down */
			this.user1 = {
				rating: 6969,
				rank: 'Uchiha',
			};
			this.user2 = {
				rating: 9696,
				rank: 'Uzumaki',
			};
		}

	});
};

describe('Codeforce Api ⌨️', function() {
	this.timeout(CODEFORCE_API_RESPONSE_TIME);
	useInTest();

	describe('getUserRating()',  function() {
		it('Should get a ranking object',  function() {
			expect(this.user1)
			.to.be.an('object');

			expect(this.user2)
			.to.be.an('object');
		});

		it('Should return a different ranking object for each user',  function() {
			expect(this.user1)
			.to.not.be.deep.equal(this.user2);
		});

		it('Returned object should have rating property', function() {
			expect(this.user1)
			.to.have.property('rating')
			.that.is.a('number');

			expect(this.user2)
			.to.have.property('rating')
			.that.is.a('number');
		});

		it('Returned object should have rank property', function() {
			expect(this.user1)
			.to.have.property('rank')
			.that.is.a('string');

			expect(this.user2)
			.to.have.property('rank')
			.that.is.a('string');
		});
	});
});
