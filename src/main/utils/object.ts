import Logger from '../logger'
/**
 * Mask an object with an mask.
 * @param target Object to be masked
 * @param mask mask
 * @returns masked results;
 * @throws Error if target is not an object;
 */
const maskObject = (target: any, mask: object): (object | Error) => {
	if (!target || !mask) throw new Error('maskObject: Argument missing!')
	if (Array.isArray(target) || typeof(target) !== 'object') throw new Error('maskObject: Target object must be an object!')
	const res = {}
	for (const key in target) {
		if (mask[key] == true) res[key] = target[key]

		else if (typeof target[key] != 'object' && typeof mask[key] != 'boolean')
			Logger.warn('Object ' + target
				+ ' at key ' + key + ' is not an object'
				+ 'but mask ' + mask + ' at this key is an object')

		else if (typeof target[key] == 'object' && typeof mask[key] == 'object') {
			const val = maskObject(target[key], mask[key])
			res[key] = val
		}
	}
	return res
}

export {
	maskObject,
}
