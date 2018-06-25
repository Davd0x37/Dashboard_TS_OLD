import { GraphQLServer } from "graphql-yoga";
import * as signale from "signale";
import { resolvers } from "./controller/Resolvers";
import typeDefs from "./controller/Schema.gql";

try {
  const server = new GraphQLServer({ typeDefs, resolvers });
  server.start(() => console.log("Server is running on localhost:4000"));
} catch (e) {
  signale.error(e);

  throw new Error(e);
}
//
// signale.error('Error')
// signale.await('Await')
// signale.complete('Complete')
// signale.debug('Debug')
// signale.fatal('Fatal')
// signale.fav('Fav')
// signale.info('Info')
// signale.note('Note')
// signale.pause('Pause')
// signale.pending('Pending')
// signale.star('Star')
// signale.start('Start')
// signale.success('Success')
// signale.warn('Warn')
// signale.watch('Watch')
// signale.log('Log')
//
// const interactive = new signale.Signale({interactive:true, scope: 'interactive'})
// interactive.await('[%d/4]', 1);
// setTimeout(() => {
//   interactive.success('[%d/4]', 2);
// }, 2000)