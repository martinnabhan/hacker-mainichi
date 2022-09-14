import fetch from 'node-fetch';
import { VERCEL_DEPLOY_HOOK_URL } from '../settings';

const vercel = {
  deploy: () => fetch(VERCEL_DEPLOY_HOOK_URL, { method: 'POST' }),
};

export { vercel };
