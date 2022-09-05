import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '@hacker-mainichi/graphql/client';
import { VisitDocument } from '@hacker-mainichi/types/graphql';

const visitStory = createAsyncThunk('stories/visitStory', async ({ date, id }: { date: string; id: number }) => {
  await client.mutate({ mutation: VisitDocument, variables: { date, ids: [id] } });

  const ids = localStorage.getItem(date);

  localStorage.setItem(date, JSON.stringify({ ...(ids ? JSON.parse(ids) : {}), [id]: true }));

  return { date, id };
});

export { visitStory };
