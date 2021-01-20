import { Provider } from 'react-redux';
import { store } from './store';
import { Stories } from '../modules/stories';
import { Nav } from './components/Nav';

const App = () => (
  <Provider store={store}>
    <div className="h-screen flex flex-col">
      <Nav />

      <main className="flex-grow">
        <div className="h-full max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
          <Stories />
        </div>
      </main>
    </div>
  </Provider>
);

export { App };
