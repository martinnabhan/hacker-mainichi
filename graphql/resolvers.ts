import { NonEmptyStringResolver as NonEmptyString, PositiveIntResolver as PositiveInt } from 'graphql-scalars';
import { Resolvers } from '@hacker-mainichi/types/graphql';
import { today } from '@hacker-mainichi/lib/today';
import { dates } from '@hacker-mainichi/lib/dates';

const visited: { [key: string]: { [key: number]: true } } = {};

for (const date of [today, ...dates]) {
  visited[date] = {};
}

const resolvers: Resolvers = {
  Mutation: {
    visit: (_, { date, ids }) => {
      for (const id of ids) {
        visited[date][id] = true;
      }

      return ids;
    },
  },
  NonEmptyString,
  PositiveInt,
  Query: {
    // TODO: query dynamodb by user id + date
    visited: (_, { date }) => Object.keys(visited[date]).map(id => Number(id)),
  },
};

export { resolvers };
