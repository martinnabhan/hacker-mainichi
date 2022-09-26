import { client } from '@hacker-mainichi/graphql/client';
import { VisitDocument } from '@hacker-mainichi/graphql/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

const visitStory = createAsyncThunk(
  'stories/visitStory',
  async ({ date, id, user }: { date: string; id: number; user: boolean }) => {
    if (user) {
      await client.mutate({ mutation: VisitDocument, variables: { date, ids: [id] } });
    }

    const ids = localStorage.getItem(date);

    localStorage.setItem(date, JSON.stringify({ ...(ids ? JSON.parse(ids) : {}), [id]: true }));

    return { date, id };
  },
);

export { visitStory };
