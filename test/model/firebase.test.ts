import { expect } from 'chai';
import Firebase from '../../src/main/model/firebase';

const useInTest = (): void => {
	before(function initializeConnectionToFirebase() {
		this.db = new Firebase();
	});

	after(function disconnectTestFirebase() {
		return this.db.terminateConnection();
	});
};

describe('Firebase', function() {
	this.timeout(10000);
	useInTest();

	describe('#getStreamingAudience()', function() {
		it('Should be able to get audience from firebase', async function() {
			const audience = await this.db.getStreamingAudience();
			const RESULT  = [
                {
                    id: '1200016940105472',
                    platform: 'messenger'
                }, 
                {
                    id : '176561917',
                    platform: 'telegram'
                }
            ];
			expect(audience)
				.to.be.an('array')
				.and.to.be.deep.equal(RESULT);
		});
	});

	// TODO: create a test database to automate this shit
	describe('#getCodeforceHandle()', function() {
		it('Should be able to get codeforce handle', async function() {
			const users = await this.db.getCodeforceHandle();
			expect(users)
				.to.be.an('object');
		});
	});
});
