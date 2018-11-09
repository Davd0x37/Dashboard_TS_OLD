// import { isFunction } from "util";

import PaypalRouter from '#/components/Paypal/Router';
import SpotifyRouter from '#/components/Spotify/Router';
import { resolvers } from '#/graphql/Resolvers';
import Schema from '#/graphql/Schema.gql';
import cookieParser from 'cookie-parser';
import { GraphQLServer } from 'graphql-yoga';
import helmet from 'helmet';
import signale from 'signale';

try {
  const server = new GraphQLServer({
    typeDefs: Schema,
    resolvers
  });

  server.express.use(helmet());
  server.express.use(cookieParser());

  server.express.use("/spotify", SpotifyRouter);
  server.express.use("/paypal", PaypalRouter);

  // const env = process.env.NODE_ENV;

  server.start(
    // {
    //   cors: {
    //     origin: "https://liquidash.pl",
    //     methods: ["POST", "GET"]
    //   },
    //   ...(env === "prod" ? { playground: false } : { playground: "/" })
    // },
    () => signale.start(`Server is running!`)
  );
} catch (e) {
  signale.error("GraphQLApp ------", e);
  throw new Error(e);
}

// const pipe = (...fns: any[]) => (...args: any[]) => fns.reduce((prev: any, curr: any) => {
//   if(isFunction(prev) && isFunction(curr)) {
//     return curr(prev(...args))
//   }else if(!isFunction(prev) && isFunction(curr)) {
//     return curr(prev)
//   }
// });

// const data = [1, 2, 3, 4, 5];

// pipe(
//   data.map(i => i),
//   (x: number, c: number) => [1,2,3,4,5, x, c],
//   // data,
//   (el: any) => console.log(el)
// )(data)


// const rec = (data, i) => {
//   if(data[i] !== undefined) {
//     console.log(data[i])
//     rec(data, ++i);
//   }else{
//     return;
//   }
// }