import { format, startOfYesterday } from 'date-fns';
import { api, db, vercel } from './lib';
import { DATE } from './settings';

const handler = async () => {
  const date = DATE || format(startOfYesterday(), 'yyyyMMdd');
  const stories = await api.stories({ date });

  await db.saveStories({ stories });
  await vercel.deploy();
};

export { handler };
