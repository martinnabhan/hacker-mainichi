const baseUrl = 'https://hacker-news.firebaseio.com/v0';

interface ApiStory extends Omit<Story, 'comments'> {
  descendants: number;
  type: string;
}

const fetchTopStories = async (): Promise<Story[]> => {
  const response = await fetch(`${baseUrl}/topstories.json`);
  const topStoryIds: number[] = await response.json();

  const responses = await Promise.all(topStoryIds.slice(0, 100).map(id => fetch(`${baseUrl}/item/${id}.json`)));
  const apiStories: (ApiStory | null)[] = await Promise.all(responses.map(response => response.json()));

  const stories = apiStories
    .filter((apiStory): apiStory is ApiStory => apiStory !== null && apiStory.type === 'story')
    .map(({ id, by, descendants, score, title }) => ({
      id,
      by,
      comments: descendants,
      score,
      title,
    }));

  return stories;
};

export { fetchTopStories };
