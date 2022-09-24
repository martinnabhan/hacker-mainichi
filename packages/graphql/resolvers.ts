import { mergeDeep } from '@apollo/client/utilities';
import { Resolvers } from '@hacker-mainichi/graphql/types';
import { resolvers as storyResolvers } from '@hacker-mainichi/stories/graphql';
import { NonEmptyStringResolver as NonEmptyString, PositiveIntResolver as PositiveInt } from 'graphql-scalars';

const resolvers: Resolvers = mergeDeep(storyResolvers, {
  Mutation: {
    empty: () => null,
  },
  NonEmptyString,
  PositiveInt,
  Query: {
    empty: () => null,
  },
});

export { resolvers };
