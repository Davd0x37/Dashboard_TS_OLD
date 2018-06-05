/**
 * User options like login, password etc.
 *
 * @export IUser
 * @interface IUser
 */
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