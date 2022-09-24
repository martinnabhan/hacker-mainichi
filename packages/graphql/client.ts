import { ApolloClient, InMemoryCache } from '@apollo/client';
import { BatchHttpLink } from '@apollo/client/link/batch-http';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new BatchHttpLink({ uri: '/api/graphql' }),
});

export { client };
