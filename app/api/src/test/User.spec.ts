// import test from 'ava'
// import { loginAvailable, User } from '../controller/User'

// test('Testing user availability', async (t) => {
//     try {
//         // const user = await User.addUser("asd")
//         const user = await loginAvailable("asd")
//         if(user) {
//             t.pass("Login available")
//         }else{
//             t.fail("User already exists")
//         }

//     } catch (error) {
//         t.fail(error)
//     }
// })

test("add 1 + 2", () => {
  expect(1 + 2).toBe(3);
});
