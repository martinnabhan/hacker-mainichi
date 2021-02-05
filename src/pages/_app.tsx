import { AppProps } from 'next/app';
import { App, createStore } from '../app';
import { State } from '../app/reducer';

import '../app/App.css';

interface PageProps {
  initialState: State;
}

let store: ReturnType<typeof createStore> | undefined;

const CustomApp = ({ Component, pageProps }: AppProps) => {
  const { initialState } = pageProps as PageProps;
  const topStories = store?.getState().stories.topStories;

  // topStories のステートをキャッシュするため
  if (topStories?.status === 'fulfilled') {
    store = createStore({ ...initialState, stories: { ...initialState.stories, topStories } });
  } else {
    store = createStore(initialState);
  }

  return (
    <App store={store}>
      <Component />
    </App>
  );
};

export default CustomApp;
