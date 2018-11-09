import { ApiURL } from "#SH/Config";
import ApolloClient from "apollo-boost";

const client: ApolloClient<any> = new ApolloClient({
  uri: ApiURL
});

/**
 * Send request to API
 *
 * @param {*} req
 * @returns {Promise<any>}
 */
export const query = async (req: any): Promise<any> => {
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
 * @returns {Promise<any>}
 */
export const mutation = async (req: any): Promise<any> => {
  try {
    const res = await client.mutate({
      mutation: req
    });
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};
