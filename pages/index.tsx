import { fetchTopStories } from '@hacker-mainichi/lib/fetchTopStories';
import { Error } from '@hacker-mainichi/components/Error';
import { Loading } from '@hacker-mainichi/components/Loading';
import { Stories } from '@hacker-mainichi/components/Stories';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { NextPage } from 'next';

interface Props {
  fetchedTopStories: Story[];
  setFetchedTopStories: Dispatch<SetStateAction<boolean>>;
  setTopStories: Dispatch<SetStateAction<Story[]>>;
  topStories: Story[];
}

const Index: NextPage<Props> = ({ fetchedTopStories, setFetchedTopStories, setTopStories, topStories }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(!fetchedTopStories);

  useEffect(() => {
    const fetch = async () => {
      try {
        setTopStories(await fetchTopStories());
        setFetchedTopStories(true);
      } catch {
        setError(true);
        setFetchedTopStories(false);
      } finally {
        setLoading(false);
      }
    };

    if (!fetchedTopStories) {
      fetch();
    }
  }, [fetchedTopStories, setFetchedTopStories, setTopStories]);

  if (error) {
    return <Error />;
  }

  if (loading) {
    return <Loading />;
  }

  return <Stories stories={topStories} />;
};

export default Index;
