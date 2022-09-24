import { makeExecutableSchema } from '@graphql-tools/schema';
import { options } from '@hacker-mainichi/auth/lib';
import { resolvers } from '@hacker-mainichi/graphql/resolvers';
import { typeDefs } from '@hacker-mainichi/graphql/schema';
import { typeDefs as storyTypeDefs } from '@hacker-mainichi/stories/graphql';
import {
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
  ContextFunction,
  ForbiddenError,
} from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-micro';
import { get } from 'env-var';
import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession as getServerSession } from 'next-auth/next';

const context: ContextFunction<{ req: NextApiRequest; res: NextApiResponse }, Context> = async ({ req, res }) => {
  const session = await getServerSession(req, res, options);

  if (!session || !session.user?.email) {
    throw new ForbiddenError('ログインしてください。');
  }

  return { user: { email: session.user.email } };
};

const server = new ApolloServer({
  cache: 'bounded',
  context,
  plugins: [
    get('NODE_ENV').asString() === 'production'
      ? ApolloServerPluginLandingPageDisabled()
      : ApolloServerPluginLandingPageGraphQLPlayground({
          settings: {
            'request.credentials': 'include',
          },
        }),
  ],
  schema: makeExecutableSchema({
    resolvers,
    typeDefs: [typeDefs, storyTypeDefs],
  }),
});

export { server };
