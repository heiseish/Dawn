import { expect } from 'chai';
import * as testServer from '../helpers/server';
const env = {
	FB_VERIFY_TOKEN: 'team69',
};
import {
	messengerPOSTRequest,
} from '../helpers/mockObjects';

describe('REST API GET Endpoints', function() {
	this.timeout(testServer.POTT_REST_API_ENDPOINT_RESPONSE_TIME);
	testServer.useInTest();

	describe('GET /ping', function() {
		it('responds with 200', async function() {
			const api = this.api;
			const response = await api.get('/ping');
			expect(response).to.have.property('status', 200);
		});
	});

	describe('GET /fb', function() {
		it('responds with 200', async function() {
			const api = this.api;
			const response = await api.get('/fb', { params: {'hub.mode': 'subscribe', 'hub.verify_token': env.FB_VERIFY_TOKEN}});
			expect(response).to.have.property('status', 200);
		});

		it('responds with 403 on wrong verify token', async function() {
			const api = this.api;
			try {
				await api.get('/fb', { params: {'hub.mode': 'subscribe', 'hub.verify_token': 123}});
			} catch (e) {
				expect(e.response.status).to.be.equal(403);
			}
		});

		it('responds with 403 on wrong hub.mode', async function() {
			const api = this.api;
			try {
				await api.get('/fb', { params: {'hub.mode': 'nicenice', 'hub.verify_token': env.FB_VERIFY_TOKEN}});
			} catch (e) {
				expect(e.response.status).to.be.equal(403);
			}

		});

		it('throw error when FB_VERIFY_TOKEN not present', async function() {
			try {
				testServer.useInTestWithoutEnvParams('FB_VERIFY_TOKEN');
				const api = this.api;
				await api.get('/fb', { params: {'hub.mode': 'subscribe', 'hub.verify_token': env.FB_VERIFY_TOKEN}});
			} catch (e) {
				expect(e).to.be.equal('missing FB_VERIFY_TOKEN');
			}

		});
	});
});

describe('REST API POST Endpoints', function() {
	this.timeout(testServer.POTT_REST_API_ENDPOINT_RESPONSE_TIME);
	testServer.useInTest();
	describe('POST /fb', function() {
		it('responds with 200', async function() {
			const mockReq = messengerPOSTRequest('mes1200016940105472', { text:  'Hello how are you'});
			const api = this.api;
			const response = await api.post('/fb', mockReq);
			expect(response).to.have.property('status', 200);
		});
	});
});

// describe('GET /fb', () => {
// 	testServer.useInTest();
// 	testDb.useInTest();

// 	it('responds with 200 { todos }', async () => {
// 		const api = this.api;

// 		// Create three todos
// 		await api.post('/todos', { title: 'Todo 1' });
// 		await api.post('/todos', { title: 'Todo 2' });
// 		await api.post('/todos', { title: 'Todo 3' });

// 		// Make the actual request to GET /todos
// 		const response = await api.get('/todos');

// 		// Assert status code 200
// 		expect(response).to.have.property('status', 200);

// 		// Assert that all three todos are included
// 		expect(response)
// 			.to.have.nested.property('data.todos')
// 			.that.is.an('array')
// 			.with.lengthOf(3);

// 		const todos = response.data.todos;

// 		// Assert that every todo contains all desired fields
// 		todos.forEach(todo => {
// 			expect(todo)
// 				.to.have.property('title')
// 				.that.is.a('string');
// 			expect(todo).to.have.property('completed', false);
// 			expect(todo)
// 				.to.have.property('createdAt')
// 				.that.is.a('string');
// 			expect(todo)
// 				.to.have.property('updatedAt')
// 				.that.is.a('string');
// 		});

// 		// Assert that todos are listed in order of creation
// 		expect(todos.map(todo => todo.title)).to.deep.equal([
// 			'Todo 1',
// 			'Todo 2',
// 			'Todo 3'
// 		]);
// 	});
// });
