import ApolloClient from "apollo-boost";

const client: ApolloClient<any> = new ApolloClient({
  uri: "http://localhost:4000"
});

/**
 * Send request to API
 *
 * @param {*} req
 * @returns {Promise<unknown>}
 */
export const query = async (req: any): Promise<unknown> => {
  try {
    const res = await client.query({
      query: req
    });
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Send mutation to API
 *
 * @param {*} req
 * @returns {Promise<unknown>}
 */
export const mutation = async (req: any): Promise<unknown> => {
  try {
    const res = await client.mutate({
      mutation: req
    });
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};
