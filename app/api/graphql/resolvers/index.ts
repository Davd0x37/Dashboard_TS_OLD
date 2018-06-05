import { User } from '../../db/User'

export const resolvers = {
	Query: {
		async getUser(_: any, args: any) {
            let ret: any = 0
            try {
                const data = await User.getUser(args.login)
                ret = data[0]
            } catch (error) {
                throw Error(error)
            }
            return ret
		}
	}
}
