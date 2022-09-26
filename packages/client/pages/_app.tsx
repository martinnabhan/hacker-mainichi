/* eslint-disable react/jsx-props-no-spreading */
import { SignInDialog } from '@hacker-mainichi/auth/components';
import { Nav } from '@hacker-mainichi/client/components/Nav';
import { dates } from '@hacker-mainichi/client/lib/dates';
import { today } from '@hacker-mainichi/client/lib/today';
import { store } from '@hacker-mainichi/state/store';
import { visitedStoriesReceived } from '@hacker-mainichi/stories/state';
import { SessionProvider } from 'next-auth/react';
import { AppProps as NextAppProps } from 'next/app';
import Head from 'next/head';
import 'tailwindcss/tailwind.css';
import { ComponentProps, useEffect } from 'react';
import { Provider } from 'react-redux';

type AppProps<P = unknown> = Omit<NextAppProps<P>, 'pageProps'> & { pageProps: P };

interface Props {
  session: ComponentProps<typeof SessionProvider>['session'];
}

const App = ({ Component, pageProps }: AppProps<Props>) => {
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

      <Provider store={store}>
        <div className="flex min-h-screen flex-col items-center gap-4 md:gap-12">
          <SessionProvider session={pageProps.session}>
            <Nav />

            <main className="flex h-full w-full max-w-4xl grow px-4 pb-4 md:pb-12">
              <Component {...pageProps} />
            </main>
          </SessionProvider>
        </div>

        <SignInDialog />
      </Provider>
    </>
  );
};

export default App;
