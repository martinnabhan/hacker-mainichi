/* eslint-disable react/jsx-props-no-spreading */
import { Nav } from '@hacker-mainichi/client/components/Nav';
import { dates } from '@hacker-mainichi/client/lib/dates';
import { today } from '@hacker-mainichi/client/lib/today';
import { store } from '@hacker-mainichi/client/state/store';
import { visitedStoriesReceived } from '@hacker-mainichi/client/state/stories';
import { AppProps } from 'next/app';
import Head from 'next/head';
import 'tailwindcss/tailwind.css';
import { useEffect } from 'react';
import { Provider } from 'react-redux';

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

      <div className="flex min-h-screen flex-col">
        <Nav />

        <main className="flex h-full grow bg-[#18191a]">
          <div className="mx-auto max-w-7xl grow py-8 px-4 sm:py-12 sm:px-6">
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
