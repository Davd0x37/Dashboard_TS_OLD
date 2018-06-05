import faker from 'faker'
import log from 'loglevel'
import {createDB} from './api/db'



export const init = async () => {
    try {
        await createDB()
    } catch (error) {
        log.error(error);
    }
}