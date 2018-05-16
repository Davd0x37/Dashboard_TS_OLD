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
