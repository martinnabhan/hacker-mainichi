import { gql } from 'apollo-server-core';

const typeDefs = gql`
  type Story {
    id: PositiveInt!
    title: NonEmptyString!
  }

  type Mutation {
    visit(date: NonEmptyString!, ids: [PositiveInt!]!): [Story!]!
  }

  type Query {
    visited(date: NonEmptyString!): [Story!]!
  }
`;

export { typeDefs };
