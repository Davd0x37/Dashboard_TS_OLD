import ApolloClient from 'apollo-boost'
import { SearchInput } from './controller/search'

// const client = new ApolloClient({
// 	uri: 'http://127.0.0.1:3030/graphql'
// })
// const search = SearchInput.fetchData(client, 'as')
// search.then(data => {
// 	console.log(data)
// })

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
