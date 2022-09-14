import { gql } from 'apollo-server-core';

const typeDefs = gql`
  scalar NonEmptyString
  scalar PositiveInt

  type Mutation {
    # TODO: regexp
    visit(date: NonEmptyString!, ids: [PositiveInt!]!): [PositiveInt!]!
  }

  type Query {
    # TODO: regexp
    visited(date: NonEmptyString!): [PositiveInt!]!
  }
`;

export { typeDefs };
