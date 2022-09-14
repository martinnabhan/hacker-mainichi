import retry from 'async-retry';
import endOfDay from 'date-fns/endOfDay';
import getUnixTime from 'date-fns/getUnixTime';
import parse from 'date-fns/parse';
import startOfDay from 'date-fns/startOfDay';
import fetch from 'node-fetch';

interface GenericItem {
  dead?: boolean;
  deleted?: boolean;
  time: number;
  type: string;
}

interface Story extends GenericItem {
  id: number;
  by: string;
  descendants: number;
  score: number;
  time: number;
  title: string;
  type: 'story';
  url: string;
}

type Item = GenericItem | Story;

const BASE_URL = 'https://hacker-news.firebaseio.com';
const chunkSize = 100;

const getMaxItemId = async () => {
  const response = await fetch(`${BASE_URL}/v0/maxitem.json`);
  const maxItemId: number = await response.json();

  return maxItemId;
};

const getItemIds = ({ startId, chunkSize }: { startId: number; chunkSize: number }) => {
  let itemId = startId + 1;

  const itemIds = [...Array(chunkSize)].reduce<number[]>(itemIds => {
    itemId = itemId - 1;

    return [...itemIds, itemId];
  }, []);

  return itemIds;
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

const getStories = ({ items, start, end }: { items: Item[]; start: number; end: number }) =>
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

    while (true) {
      console.log(`Fetching items ${startId} to ${startId - 100}...`);

      const itemIds = getItemIds({ startId, chunkSize });
      const items = await getItems({ itemIds });
      const stories = getStories({ items, start, end });

      apiStories = [...apiStories, ...stories];
      startId = startId - 100;

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
