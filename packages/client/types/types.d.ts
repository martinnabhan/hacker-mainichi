interface PageProps {
  date: string;
  stories: Story[];
}

interface Story {
  comments: number;
  id: number;
  score: number;
  title: string;
}

type Status = 'fulfilled' | 'idle' | 'pending' | 'rejected';
