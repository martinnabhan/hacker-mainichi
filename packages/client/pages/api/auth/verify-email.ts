import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { TableName, client } from '@hacker-mainichi/dynamodb';
import { addMinutes } from 'date-fns';
import { get } from 'env-var';
import { NextApiHandler } from 'next';
import nodemailer from 'nodemailer';

const RECAPTCHA_SECRET_KEY = get('RECAPTCHA_SECRET_KEY').required().asString();

const mail = nodemailer.createTransport({
  auth: {
    pass: get('GMAIL_APP_PASSWORD').required().asString(),
    user: get('GMAIL_USER').required().asString(),
  },
  service: 'gmail',
});

const VerifyEmail: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed' });
  }

  const { email, reCaptchaToken } = req.body;

  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    body: `secret=${RECAPTCHA_SECRET_KEY}&response=${reCaptchaToken}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('reCAPTCHA トークンが無効です。');
  }

  const { hostname, success } = await response.json();

  if (!success || hostname !== req.headers.host?.replace(/:.*/, '')) {
    throw new Error('reCAPTCHA トークンが無効です。');
  }

  const code = `${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(
    Math.random() * 10,
  )}${Math.floor(Math.random() * 10)}`;

  await mail.verify();

  await client.send(
    new PutCommand({
      Item: {
        expires: addMinutes(new Date(), 10).getTime(),
        pk: `VERIFICATION_REQUEST#${code}`,
        sk: `USER#${email}`,
      },
      TableName,
    }),
  );

  await mail.sendMail({
    from: 'ハッカー毎日 <noreply@hacker-mainichi.vercel.app>',
    subject: '確認コード',
    text: `確認コードを10分以内にご記入ください：${code}`,
    to: email,
  });

  return res.status(200).json({ message: 'OK' });
};

export default VerifyEmail;
