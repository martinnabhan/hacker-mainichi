import { resolvers } from '@hacker-mainichi/client/graphql/resolvers';
import { typeDefs } from '@hacker-mainichi/client/graphql/schema';
import {
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-micro';

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
