import { expect } from 'chai';
import {
	getPlatformAndId,
} from '../../src/main/utils/account';
import {
	generateRandomId,
} from '../../src/main/utils/string';

describe('Account Utils', function() {
	describe('getPlatformAndId()', function() {
		it('Should return the correct platform for messenger', function() {
			const messenger = 'mes';
			const num = generateRandomId();
			const {
				platform,
				id,
			} = getPlatformAndId(messenger + num);
			expect(platform)
				.to.be.a('string')
				.and.to.be.equal('messenger');

			expect(id).to.be.a('string').and.to.be.equal(num);
		});

		it('Should return the correct platform for telegram', function() {
			const telegram = 'tlg';
			const num = generateRandomId();
			const {
				platform,
				id,
			} = getPlatformAndId(telegram + num);
			expect(platform)
				.to.be.a('string')
				.and.to.be.equal('telegram');
			expect(id).to.be.a('number').and.to.be.equal(parseInt(num));

		});

		it('Should return the correct platform for unknown', function() {
			const unknown = 'gia';
			const num = generateRandomId();
			const {
				platform,
				id,
			} = getPlatformAndId(unknown + num);
			expect(platform)
				.to.be.a('string')
				.and.to.be.equal('unknown');
			expect(id).to.be.a('string').and.to.be.equal(num);

		});
	});
});
