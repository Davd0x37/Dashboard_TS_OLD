import test from 'ava'
import { loginAvailable, User } from '../db/User'

test('Testing user availability', async (t) => {
    try {
        // const user = await User.addUser("asd")
        const user = await loginAvailable("asd")
        if(user) {
            t.pass("Login available")
        }else{
            t.fail("User already exists")
        }

    } catch (error) {
        t.fail(error)
    }
})
