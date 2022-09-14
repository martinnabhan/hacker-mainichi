import { NextApiHandler } from 'next';
import { server } from '@hacker-mainichi/client/graphql/server';

const config = {
  api: {
    bodyParser: false,
  },
};

const start = server.start();

const graphql: NextApiHandler = async (req, res) => {
  await start;

  const handler = server.createHandler({ path: '/api/graphql' });

  return handler(req, res);
};

export { config };

export default graphql;
