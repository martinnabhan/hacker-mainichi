import { Store } from '@reduxjs/toolkit';
import { FunctionComponent } from 'react';
import { Provider } from 'react-redux';
import { Nav } from './components/Nav';
import { State } from './reducer';

interface Props {
  store: Store<State>;
}

const App: FunctionComponent<Props> = ({ children, store }) => (
  <Provider store={store}>
    <div className="min-h-screen flex flex-col">
      <Nav />

      <main className="flex flex-grow h-full">
        <div className="flex-grow max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6">{children}</div>
      </main>
    </div>
  </Provider>
);

export { App };
