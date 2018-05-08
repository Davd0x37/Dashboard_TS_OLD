import rethink from 'rethinkdb'
import { DB } from './index'

export interface IUser {
	id: number
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
	async addUser(params: IUser) {
		const con = await DB()
		rethink.db('users').table('general').insert(params).run(con).catch((err) => {
			throw Error(err)
		})
	}
}