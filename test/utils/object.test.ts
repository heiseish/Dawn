import { expect } from 'chai'
import {
	maskObject
} from '../../src/main/utils/object'
import { invalid } from 'moment';


describe('Object Utils', () => {
	describe('maskObject()', () => {
		const validTarget = {
			name: 'haha',
			company: {
				title: 'boss',
				division: 'machine learning'
			},
			minions: ['No-one', 'Sumail', 'RTZ', 'Miracle']
		}
		
		const invalidArrayTarget = ['This', 'is', 'not', 'a', 'valid', 'target']
		const invalidNumberTarget = 69
		const invalidStringTarget = 'This is not a valid target'
		
		
		const fullyValidMask1 = {
			name: true,
			company: {
				title: true,
				division: false
			},
			minions: true
		}
		
		const fullyValidMask2 = {
			name: true,
			company: true,
			minions: true
		}
		
		const semiValidMask1 = {
			name: {
				hehe: true
			}
			
		}

		it('Should throw an error since both paramters are missing', () => {
			expect(maskObject)
				.to.throw(Error, 'maskObject: Argument missing!')
		})
		it('Should throw an error since no target is provided', () => {
			expect(maskObject.bind(null, null, fullyValidMask1))
				.to.throw(Error, 'maskObject: Argument missing!')
		})

		it('Should throw an error since mask is missing', () => {
			expect(maskObject.bind(null, validTarget))
				.to.throw(Error, 'maskObject: Argument missing!')
		})

		it('Should throw an error since target is an array', () => {
			expect(maskObject.bind(null, invalidArrayTarget, fullyValidMask1))
				.to.throw(Error, 'maskObject: Target object must be an object!')
		})

		it('Should throw an error since target is a number', () => {
			expect(maskObject.bind(null, invalidNumberTarget, fullyValidMask1))
				.to.throw(Error, 'maskObject: Target object must be an object!')
		})

		it('Should throw an error since target is a string', () => {
			expect(maskObject.bind(null, invalidStringTarget, fullyValidMask1))
				.to.throw(Error, 'maskObject: Target object must be an object!')
		})

		it('Should mask the object recursively', () => {
			const res = {
				name: 'haha',
				company: {
					title: 'boss'
				},
				minions: ['No-one', 'Sumail', 'RTZ', 'Miracle']
			}
			expect(maskObject(validTarget, fullyValidMask1))
				.to.be.an('object')
				.and.to.be.deep.equal(res)
		})
		
		it('Should mask the object non-recursively', () => {
			const res = {
				name: 'haha',
				company: {
					title: 'boss',
					division: 'machine learning'
				},
				minions: ['No-one', 'Sumail', 'RTZ', 'Miracle']
			}
			expect(maskObject(validTarget, fullyValidMask2))
				.to.be.an('object')
				.and.to.be.deep.equal(res)
		})
	})
})

