import { options } from '@hacker-mainichi/auth/lib';
import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';

const auth: NextApiHandler = (req, res) => NextAuth(req, res, options);

export default auth;
