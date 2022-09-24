import { client } from '@hacker-mainichi/graphql/client';
import { VisitDocument, VisitedDocument } from '@hacker-mainichi/graphql/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

const fetchVisitedStories = createAsyncThunk('stories/fetchVisitedStories', async ({ date }: { date: string }) => {
  const response = await client.query({ query: VisitedDocument, variables: { date } });

  const responseIds = response.data.visited.map(({ id }) => id);
  const item = localStorage.getItem(date);
  const ids: { [key: number]: true } = item ? JSON.parse(item) : {};

  for (const id of responseIds) {
    ids[id] = true;
  }

  localStorage.setItem(date, JSON.stringify(ids));

  const idsNotInResponse = Object.keys(ids).flatMap(stringId => {
    const id = Number(stringId);

    return responseIds.includes(id) ? [] : id;
  });

  if (idsNotInResponse.length > 0) {
    await client.mutate({ mutation: VisitDocument, variables: { date, ids: idsNotInResponse } });
  }

  return { date, ids: responseIds };
});

export { fetchVisitedStories };
