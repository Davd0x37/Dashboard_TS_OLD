import log from 'loglevel'
import rethink from 'rethinkdb'
import { DB } from './Connection'
import { IUser } from './IUser'

const config = {
	general: rethink.db('users').table('general')
}

export const loginAvailable = async (login: string) => {
	try {
		const con = await DB()
		const user = await config.general.filter({ login }).run(con).then((cursor) => cursor.toArray())
		if (user.length === 0) {
			return true
		} else {
			log.info(user)
			return false
		}
	} catch (error) {
		log.error(error)
	}
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
			const available = await loginAvailable(params.login)
			if (available) {
				config.general.insert(params).run(con)
				return true
			} else {
				return false
			}
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
			return config.general.filter({ login }).run(con).then((cursor) => cursor.toArray())
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
			return config.general.run(con).then((cursor) => cursor.toArray())
		} catch (error) {
			log.error(error)
		}
	}
}
