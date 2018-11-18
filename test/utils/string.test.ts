import { expect } from 'chai'
import {
	generateRandomId,
	getNumberStringFromString,
	padLeft,
	padRight,
	replaceAll,
	replaceAllSubstring,
	tokenizeText,
} from '../../src/main/utils/string'

describe('String Utils', function() {
	const mock = 'abc'
	const mockSentence = 'such a nice house'

	describe('padRight()', function() {
		it('pad string correctly', function() {
			const result = 'abc0000000'
			expect(result)
				.to.be.a('string')
				.with.lengthOf(10)
			expect(padRight(mock, '0', 10)).to.be.equal(result)
		})
	})

	describe('padLeft()', function() {
		it('pad string correctly', function() {
			const result = '0000000abc'
			expect(result).to.be.a('string').with.lengthOf(10)
			expect(padLeft(mock, '0', 10)).to.be.equal(result)
		})
	})

	describe('tokenizeText()', function() {
		it('tokenize string correctly', function() {
			const result = ['nice', 'hous']
			expect(tokenizeText(mockSentence))
				.to.be.an('array')
				.with.length(2)
				.and.to.be.deep.equal(result)
		})
	})

	describe('replaceAllSubstring()', function() {
		it('remove substrings correctly', function() {
			const result = 'sch a nic hos'
			expect(replaceAllSubstring(mockSentence, 'u', 'e'))
				.to.be.a('string')
				.and.to.be.equal(result)
		})
	})

	describe('getNumberStringFromString()', function() {
		it('get correct number', function() {
			const str = 'abc123osqpqwm'
			expect(getNumberStringFromString(str))
				.to.be.a('string')
				.and.to.be.equal('123')
		})

	})

	describe('generateRandomId()', function() {
		it('generate random number with default length 10', function() {
			expect(generateRandomId())
				.to.be.a('string')
				.with.length(10)
		})

		it('generate random number with length 20', function() {
			expect(generateRandomId(20))
				.to.be.a('string')
				.with.length(20)
		})
	})

	describe('replaceAll()', function() {
		it('replace all occurence of a substring with another substring', function() {
			expect(replaceAll(mockSentence, 'nice', 'pretty'))
				.to.be.a('string')
				.to.be.equal('such a pretty house')
		})
	})

})
