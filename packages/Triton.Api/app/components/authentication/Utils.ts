import { GotPromise, post } from "got";

export const basicAuth = (clientID: string, clientSecret: string): string =>
  `Basic ${Buffer.from(clientID + ":" + clientSecret).toString("base64")}`;

export const requestTokens = ({
  body,
  auth,
  url
}: {
  body: {};
  auth: string;
  url: string;
}): GotPromise<any> =>
  post(url, {
    form: true,
    body,
    headers: {
      Authorization: auth
    },
    json: true
  });
