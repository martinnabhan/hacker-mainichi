interface Story {
  comments: number;
  id: number;
  score: number;
  title: string;
}

interface ApiStory extends Omit<Story, 'comments'> {
  descendants: number;
  type: string;
}

interface DBStory extends Omit<Story, 'id'> {
  pk: string;
  sk: string;
}

type Status = 'fulfilled' | 'idle' | 'pending' | 'rejected';

type UserVisitedStory = Omit<DBStory, 'comments' | 'score'>;
