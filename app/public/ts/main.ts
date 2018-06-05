import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'
import { SearchInput } from './controller/search'

const client = new ApolloClient({
	uri: 'http://127.0.0.1:3030/graphql'
})

window.addEventListener('DOMContentLoaded', (e) => {
	const login = 'Mark'
	client
		.query({
			query: gql`
    {
        getUser(login: "${login}") {
            id
            login
            password
        }
    }
    `
		})
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
})

// import { View } from './components/PostFeed'

// document.addEventListener(
// 	'DOMContentLoaded',
// 	(e) => {

// 		const elem: any = View.createPost(
// 			{
// 				header: {
// 					image: '../public/img/avatar.jpg',
// 					title: 'Lorem ipsum',
// 					date: new Date().toDateString()
// 				},
// 				content: {
// 					template: `
//           <div>
//             <h1>Hello retards</h1>
//             <main>
//                 <p>Lorem ipsum...</p>
//             </main>
//           </div>
//           `
// 				},
// 				footer: {
// 					actions: {
// 						like: 2,
// 						share: 20,
// 						comment: 2
// 					}
// 				}
// 			},
// 			document.querySelector('.timeline')
// 		)
// 	},
// 	false
// )
