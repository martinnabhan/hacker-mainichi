import { AppProps } from 'next/app';
import Head from 'next/head';
import 'tailwindcss/tailwind.css';
import { Nav } from '@hacker-mainichi/components/Nav';
import { useState } from 'react';
import { useRouter } from 'next/router';

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  const [fetchedTopStories, setFetchedTopStories] = useState(false);
  const [topStories, setTopStories] = useState<Story[]>([]);

  return (
    <>
      <Head>
        <title>ハッカー毎日</title>
      </Head>

      <div className="min-h-screen flex flex-col">
        <Nav />

        <main className="flex flex-grow h-full bg-[#18191a]">
          <div className="flex-grow max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
            {router.asPath === '/' ? (
              <Component
                {...pageProps}
                fetchedTopStories={fetchedTopStories}
                setFetchedTopStories={setFetchedTopStories}
                setTopStories={setTopStories}
                topStories={topStories}
              />
            ) : (
              <Component {...pageProps} />
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default App;
