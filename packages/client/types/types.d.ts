interface Story {
  comments: number;
  id: number;
  score: number;
  title: string;
}

interface PageProps {
  date: string;
  stories: Story[];
}

type Status = 'fulfilled' | 'idle' | 'pending' | 'rejected';
