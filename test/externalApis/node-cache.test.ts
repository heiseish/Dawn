import { expect } from 'chai'
import * as testCache from '../helpers/nodeCache'

describe('Node-cache', function() {
	testCache.useInTest()

	describe('#save()', function() {
		it('Should save document to memory', async function() {
			const cache = this.cache
			const res = await cache.save('first key', 'first value')
			expect(res).to.be.equal('OK')
		})

		it('Should throw error when saving document to memory without data', async function() {
			const cache = this.cache
			try {
				await cache.save('first key')
			} catch (e) {
				expect(e).to.be.equal('Missing data')
			}
		})

		it('Should throw error when saving document to memory without key', async function() {
			const cache = this.cache
			try {
				await cache.save(null, 'first value')
			} catch (e) {
				expect(e).to.be.equal('Missing key')
			}
		})

		it('Should throw error when saving document to memory without anything', async function() {
			const cache = this.cache
			try {
				await cache.save()
			} catch (e) {
				expect(e).to.be.equal('Missing key')
			}
		})
	})

	describe('#get()', function() {
		it('Should get single value from memory', async function() {
			const cache = this.cache
			await cache.save('first key', 'first value')
			const res = await cache.get('first key')
			expect(res).to.be.equal('first value')
		})

		it('Should get object from memory', async function() {
			const cache = this.cache
			const testStub = {
				id: 1,
				string: '123',
			}
			await cache.save('first key', testStub)
			const res = await cache.get('first key')
			expect(res).to.be.deep.equal(testStub)
		})

		it('Should throw error when getting data without key', async function() {
			const cache = this.cache
			try {
				await cache.get()
			} catch (e) {
				expect(e).to.be.equal('Missing key')
			}
		})
		it('Should return undefined when getting without saving first', async function() {
			const cache = this.cache
			const res = await cache.get('haha')
			expect(res).to.be.equal(undefined)
		})
	})
})
