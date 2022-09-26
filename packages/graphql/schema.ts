import { gql } from 'apollo-server-core';

const typeDefs = gql`
  scalar NonEmptyString
  scalar PositiveInt

  type Mutation {
    empty: String
  }

  type Query {
    empty: String
  }
`;

export { typeDefs };
