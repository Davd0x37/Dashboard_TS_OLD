import log from 'loglevel'
import { IUser } from '../../db/IUser'
import { User } from '../../db/User'

export const resolvers = {
	Query: {
		async getUser(_: any, args: any) {
			try {
                
				return {
					id: args.id,
					login: args.login
				}
			} catch (error) {
				log.error(error)
			}
		}
	},
	Mutation: {
		async addUser(_: any, args: any) {
			try {
				log.error(args.data)
				const user = await User.addUser(args.data)
				if (user) {
					return true
				} else {
					return false
				}
			} catch (error) {
				log.error(error)
				return false
			}
		}
	}
}
