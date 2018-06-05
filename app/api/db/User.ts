import log from 'loglevel'
import rethink from 'rethinkdb'
import { DB } from './Connection'
import { IUser } from './IUser'

const config = {
	db: rethink.db('users')
}

export const User = {
	/**
	 * Add new user to database
	 * 
	 * @param params IUser options
	 */
	async addUser(params: IUser) {
		try {
			const con = await DB()
			config.db.table('general').insert(params).run(con)
		} catch (error) {
			log.error(error)
		}
	},

	/**
	 * Get user from database
	 *
	 * @param {string} login
	 * @returns [array] all informations about selected user
	 */
	async getUser(login: string) {
		try {
			const con = await DB()
			return config.db.table('general').filter({ login }).run(con).then((cursor) => cursor.toArray())
		} catch (error) {
			log.error(error)
		}
	},
	/**
	 * Get all users from database
	 *
	 * @returns [array] array of users
	 */
	async getAllUsers() {
		try {
			const con = await DB()
			return config.db.table('general').run(con).then((cursor) => cursor.toArray())
		} catch (error) {
			log.error(error)
		}
	}
}
