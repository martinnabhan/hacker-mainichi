import { api, db, vercel } from './lib';
import { DATE } from './settings';
import { format, startOfYesterday } from 'date-fns';

const handler = async () => {
  const date = DATE || format(startOfYesterday(), 'yyyyMMdd');
  const stories = await api.stories({ date });

  await db.saveStories({ stories });
  await vercel.deploy();
};

export { handler };
