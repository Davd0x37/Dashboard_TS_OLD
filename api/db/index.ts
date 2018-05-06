import faker from 'faker';
import rethink from 'rethinkdb';

export const DB = async () => {
	const connection = await rethink.connect({
		host: 'localhost',
		port: 28015,
		db: 'users'
	});
	return connection;
};

async function addUser() {
	const conn = await DB();

	rethink
		.db('users')
		.table('posts')
		.insert({
			author: faker.name.findName(),
			email: faker.internet.email(),
			country: faker.address.country(),
			username: faker.internet.userName(),
			password: faker.internet.password(),
			avatart: faker.internet.avatar()
		})
		.run(conn)
		.catch((err) => {
			throw Error(err);
		});
}

export const init = () => {

}