import { AppProps } from 'next/app';
import Head from 'next/head';
import 'tailwindcss/tailwind.css';
import { Nav } from '@hacker-mainichi/client/components/Nav';
import { Provider } from 'react-redux';
import { store } from '@hacker-mainichi/client/state/store';
import { useEffect } from 'react';
import { today } from '@hacker-mainichi/client/lib/today';
import { dates } from '@hacker-mainichi/client/lib/dates';
import { visitedStoriesReceived } from '@hacker-mainichi/client/state/stories';

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    const visited: { [key: string]: { [key: number]: true } } = {};

    for (const date of [today, ...dates]) {
      const ids = localStorage.getItem(date);

      if (ids) {
        visited[date] = JSON.parse(ids);
      }
    }

    store.dispatch(visitedStoriesReceived({ visited }));
  }, []);

  return (
    <>
      <Head>
        <title>ハッカー毎日</title>
      </Head>

      <div className="min-h-screen flex flex-col">
        <Nav />

        <main className="flex flex-grow h-full bg-[#18191a]">
          <div className="flex-grow max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
            <Provider store={store}>
              <Component {...pageProps} />
            </Provider>
          </div>
        </main>
      </div>
    </>
  );
};

export default App;
