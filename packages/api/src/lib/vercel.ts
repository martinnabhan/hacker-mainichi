import { VERCEL_DEPLOY_HOOK_URL } from '../settings';
import fetch from 'node-fetch';

const vercel = {
  deploy: () => fetch(VERCEL_DEPLOY_HOOK_URL, { method: 'POST' }),
};

export { vercel };
