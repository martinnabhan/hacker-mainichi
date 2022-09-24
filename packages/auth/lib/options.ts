import { DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { TableName, client } from '@hacker-mainichi/dynamodb';
import { get } from 'env-var';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import isEmail from 'validator/lib/isEmail';

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider<{
      code?: { value: string };
      email?: { value: string };
    }>({
      authorize: async credentials => {
        if (
          !credentials?.code ||
          !credentials?.email ||
          !credentials.code.match(/^\d{4}$/) ||
          !isEmail(credentials.email)
        ) {
          return null;
        }

        const { code, email } = credentials;

        const response = await client.send(
          new DeleteCommand({
            Key: {
              pk: `VERIFICATION_REQUEST#${code}`,
              sk: `USER#${email}`,
            },
            ReturnValues: 'ALL_OLD',
            TableName,
          }),
        );

        if (!response.Attributes) {
          return null;
        }

        return { email };
      },
      credentials: {},
    }),
  ],
  secret: get('NEXTAUTH_SECRET').required().asString(),
};

export { options };
