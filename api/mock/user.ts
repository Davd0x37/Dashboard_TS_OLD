import faker from 'faker'
import argon2 from 'argon2'

export const hashPass = async (pass: string) => {
    try {
        const salt = Buffer.alloc(512, 'SaltArgon2')
        const hash = await argon2.hash(pass, {
            type: argon2.argon2id,
            salt
        })
        return hash
    } catch (error) {
        throw new Error(error)
    }
}

export const verifyPass = async (hash: string, pass: string) => {
    try {
        if(await argon2.verify(hash, pass)) {
            return true
        }else{
            return false
        }
    } catch (error) {
        throw new Error(error)
    }
}

import { IUser } from '../db/user'

export const addUser: IUser = {
	avatar: faker.image.avatar(),
	country: faker.address.country(),
	email: faker.internet.email(),
	firstName: faker.name.firstName(),
	id: faker.random.number(),
	language: faker.address.countryCode(),
	lastName: faker.name.lastName(),
	login: faker.internet.userName(),
    // password: faker.internet.password(),
}
