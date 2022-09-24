import { VERCEL_DEPLOY_HOOK_URL } from '@hacker-mainichi/api/settings';
import fetch from 'node-fetch';

const vercel = {
  deploy: () => fetch(VERCEL_DEPLOY_HOOK_URL, { method: 'POST' }),
};

export { vercel };
