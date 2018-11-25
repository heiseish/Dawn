import NodeCache from '../../src/main/model/cache'

const useInTest = (): void => {
	before(function setUpCache() {
		this.cache = new NodeCache(null)
	})

	beforeEach(function dropCache() {
		return this.cache.flush()
	})

	after(function closeCache() {
		return this.cache.close()
	})
}

export {
	useInTest,
}
