import { AppProps } from 'next/app';
import { App, createStore, Draggable } from '../app';
import { State } from '../app/reducer';

import '../app/App.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface PageProps {
  initialState: State;
}

let store: ReturnType<typeof createStore> | undefined;

const CustomApp = ({ Component, pageProps }: AppProps) => {
  const { initialState } = pageProps as PageProps;
  const router = useRouter();
  const topStories = store?.getState().stories.topStories;
  const x = store?.getState().days.x;

  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice(!window.matchMedia('(hover: hover)').matches);
  }, []);

  // stories.topStories と days.x のステートをキャッシュするため
  store = createStore({
    ...initialState,
    ...(topStories?.status === 'fulfilled' && { stories: { ...initialState.stories, topStories } }),
    ...(x !== undefined && { days: { ...initialState.days, x } }),
  });

  if (router.route === '/404' || !isTouchDevice) {
    return (
      <App store={store}>
        <Component />
      </App>
    );
  }

  return (
    <App store={store}>
      <Draggable>
        <Component />
      </Draggable>
    </App>
  );
};

export default CustomApp;
