import {
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-micro';
import { typeDefs } from '@hacker-mainichi/client/graphql/schema';
import { resolvers } from '@hacker-mainichi/client/graphql/resolvers';

const server = new ApolloServer({
  cache: 'bounded',
  plugins: [
    process.env.NODE_ENV === 'production'
      ? ApolloServerPluginLandingPageDisabled()
      : ApolloServerPluginLandingPageGraphQLPlayground({
          settings: {
            'request.credentials': 'include',
          },
        }),
  ],
  resolvers,
  typeDefs,
});

export { server };
