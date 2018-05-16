import rethink from 'rethinkdb'
import { DB } from './index'

export interface IUser {
	login: string
	password?: string
	firstName: string
	lastName: string
	email: string
	avatar?: string
	country: string
	language: string
}

export const User = {
	db: rethink.db('users'),
	async addUser(params: IUser) {
		try {
			const con = await DB()
			this.db.table('general').insert(params).run(con)
		} catch (error) {
			throw Error(error)
		}
	},
	async getUser(login: string) {
		try {
			const con = await DB()
			return this.db.table('general').filter({'login': login}).run(con).then(cursor => cursor.toArray())
		} catch (error) {
			throw Error(error)
		}
	},
	async getAllUsers() {
		try {
			const con = await DB()
			return this.db.table('general').run(con).then(cursor => cursor.toArray())
		} catch (error) {
			throw Error(error)
		}
	}
}
