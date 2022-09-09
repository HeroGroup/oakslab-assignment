import { schema } from '../data/schema'
import apolloServerResponse from '../interfaces/apolloServerResponse';
const { ApolloServer } = require('apollo-server');

const {
  ApolloServerPluginLandingPageLocalDefault
} = require('apollo-server-core');

const server = new ApolloServer({
  schema,
  csrfPrevention: true,
  cache: 'bounded',
  plugins: [
    ApolloServerPluginLandingPageLocalDefault({ embed: true }),
  ],
});

server.listen().then(({ url }: apolloServerResponse) => {
  console.log(`🚀  Server ready at ${url}`);
});