import { client } from '@hacker-mainichi/client/graphql/client';
import { VisitDocument } from '@hacker-mainichi/client/types/graphql';
import { createAsyncThunk } from '@reduxjs/toolkit';

const visitStory = createAsyncThunk('stories/visitStory', async ({ date, id }: { date: string; id: number }) => {
  await client.mutate({ mutation: VisitDocument, variables: { date, ids: [id] } });

  const ids = localStorage.getItem(date);

  localStorage.setItem(date, JSON.stringify({ ...(ids ? JSON.parse(ids) : {}), [id]: true }));

  return { date, id };
});

export { visitStory };
