import { AppProps } from 'next/app';
import { App, createStore } from '../app';
import { State } from '../app/reducer';

import '../app/App.css';

interface PageProps {
  initialState: State;
}

const CustomApp = ({ Component, pageProps }: AppProps) => {
  const { initialState } = pageProps as PageProps;

  return (
    <App store={createStore(initialState)}>
      <Component />
    </App>
  );
};

export default CustomApp;
