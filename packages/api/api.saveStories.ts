import { api } from '@hacker-mainichi/api/lib/api';
import { db } from '@hacker-mainichi/api/lib/db';
import { vercel } from '@hacker-mainichi/api/lib/vercel';
import { DATE } from '@hacker-mainichi/api/settings';
import { format, startOfYesterday } from 'date-fns';

const handler = async () => {
  const date = DATE || format(startOfYesterday(), 'yyyyMMdd');
  const stories = await api.fetchStories({ date });

  await db.saveStories({ date, stories });
  await vercel.deploy();
};

export { handler };
