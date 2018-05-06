export default {
	Query: {
		allPosts() {
			return [
				{
					id: 1,
					author: {
						id: 1,
						name: 'asd',
						password: 'ASD',
						join_date: 'ASDASDA'
					},
					create_date: 'ASDA',
					title: 'ASD',
					content: 'ASD',
					likes: {
						id: 1,
						user: {
							id: 1,
							name: 'asd',
							password: 'ASD',
							join_date: 'ASDASDA'
						}
					}
				}
			];
		}
	}
};
