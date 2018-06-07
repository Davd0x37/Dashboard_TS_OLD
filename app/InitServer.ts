import faker from 'faker'
import log from 'loglevel'
import { createDB } from './api/db/Connection'

(async () => {
	try {
		await createDB()
	} catch (error) {
		log.error(error)
	}
})()