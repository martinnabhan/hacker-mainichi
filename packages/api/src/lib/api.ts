/* eslint-disable no-console */
import retry from 'async-retry';
import { endOfDay, getUnixTime, parse, startOfDay } from 'date-fns';
import fetch from 'node-fetch';

interface GenericItem {
  dead?: boolean;
  deleted?: boolean;
  time: number;
  type: string;
}

interface Story extends GenericItem {
  by: string;
  descendants: number;
  id: number;
  score: number;
  time: number;
  title: string;
  type: 'story';
  url: string;
}

type Item = GenericItem | Story;

const BASE_URL = 'https://hacker-news.firebaseio.com';
const CHUNK_SIZE = 100;

const getMaxItemId = async () => {
  const response = await fetch(`${BASE_URL}/v0/maxitem.json`);
  const maxItemId: number = await response.json();

  return maxItemId;
};

const getItemIds = ({ startId, chunkSize }: { chunkSize: number; startId: number }) => {
  let itemId = startId + 1;

  return [...Array(chunkSize)].reduce<number[]>(itemIds => {
    itemId -= 1;

    return [...itemIds, itemId];
  }, []);
};

const getItems = async ({ itemIds }: { itemIds: number[] }) => {
  const responses = await Promise.all(
    itemIds.map(itemId =>
      retry(() => fetch(`${BASE_URL}/v0/item/${itemId}.json`), {
        onRetry: () => console.log(`Retrying ${itemId}...`),
      }),
    ),
  );

  const items: Item[] = await Promise.all(responses.map(response => response.json()));

  return items;
};

const getStories = ({ items, start, end }: { end: number; items: Item[]; start: number }) =>
  items.filter(
    (item): item is Story =>
      item && item.type === 'story' && !item.dead && !item.deleted && item.time >= start && item.time <= end,
  );

const api = {
  stories: async ({ date }: { date: string }) => {
    const parsedDate = parse(date, 'yyyyMMdd', new Date());
    const start = getUnixTime(startOfDay(parsedDate));
    const end = getUnixTime(endOfDay(parsedDate));

    let apiStories: Story[] = [];
    let startId = await getMaxItemId();

    // eslint-disable-next-line no-constant-condition
    while (true) {
      console.log(`Fetching items ${startId} to ${startId - 100}...`);

      const itemIds = getItemIds({ startId, chunkSize: CHUNK_SIZE });
      // eslint-disable-next-line no-await-in-loop
      const items = await getItems({ itemIds });
      const stories = getStories({ items, start, end });

      apiStories = [...apiStories, ...stories];
      startId -= 100;

      if (items[items.length - 1].time < start) {
        break;
      }
    }

    const stories = apiStories.map(({ id, by, descendants, score, title }) => ({
      id,
      by,
      comments: descendants,
      date,
      score,
      title,
    }));

    console.log(`Fetched ${stories.length} items.`);

    return stories;
  },
};

export { api };
