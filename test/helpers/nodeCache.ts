import * as NodeCache from '../../src/main/externalApis/node-cache'

const useInTest = (): void => {
	before(function setUpCache() {
		this.cache = NodeCache
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
