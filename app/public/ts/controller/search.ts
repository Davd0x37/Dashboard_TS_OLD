import gql from 'graphql-tag'

export const SearchInput = {
	searchInput: document.querySelector('.search__input'),
	searchResult: document.querySelector('.search__result'),
	async fetchData(client: any, data: string) {
		try {
			return client.query({
				guery: gql`
					query Root {
						getUser(id: "Iva.Hermiston") {
							id
						}
					}
				`
			})
		} catch (error) {
			throw Error(error)
		}
	}
}
