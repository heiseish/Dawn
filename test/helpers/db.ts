import { MongoClient } from 'mongodb';

const useInTest = (): void => {
	before(async function connectToTestDB() {
		const mongoClient = await MongoClient.connect(
			'mongodb://localhost:27017',
			{ useNewUrlParser: true }
		);

		const db = mongoClient.db('potts-db-test');

		this.mongoClient = mongoClient;
		this.db = db;
	});

	beforeEach(function dropTestDB() {
		return this.db.dropDatabase();
	});

	after(function disconnectTestDB() {
		return this.mongoClient.close();
	});
};

export {
	useInTest,
};
