import { client } from '@hacker-mainichi/client/graphql/client';
import { VisitDocument, VisitedDocument } from '@hacker-mainichi/client/types/graphql';
import { createAsyncThunk } from '@reduxjs/toolkit';

const fetchVisitedStories = createAsyncThunk('stories/fetchVisitedStories', async ({ date }: { date: string }) => {
  const response = await client.query({ query: VisitedDocument, variables: { date } });

  const item = localStorage.getItem(date);
  const ids: { [key: number]: true } = item ? JSON.parse(item) : {};

  for (const id of response.data.visited) {
    ids[id] = true;
  }

  localStorage.setItem(date, JSON.stringify(ids));

  const idsNotInResponse = Object.keys(ids).flatMap(stringId => {
    const id = Number(stringId);

    return response.data.visited.includes(id) ? [] : id;
  });

  if (idsNotInResponse.length > 0) {
    await client.mutate({ mutation: VisitDocument, variables: { date, ids: idsNotInResponse } });
  }

  return { date, ids: response.data.visited };
});

export { fetchVisitedStories };
