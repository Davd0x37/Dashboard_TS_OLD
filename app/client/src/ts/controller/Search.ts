import gql from "graphql-tag";

export const SearchInput = {
  searchInput: document.querySelector(".search__input"),
  searchResult: document.querySelector(".search__result"),
  async fetchData(client: any, _: string) {
    try {
      return client.query({
        guery: gql`
          {
            getUser(login: "ASD", id: 12) {
              id
            }
          }
        `
      });
    } catch (error) {
      throw Error(error);
    }
  }
};
