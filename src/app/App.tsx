import { Provider } from 'react-redux';
import { store } from './store';
import { Stories } from '../modules/stories';
import { Nav } from './components/Nav';

const App = () => (
  <Provider store={store}>
    <Nav />

    <main>
      <div className="max-w-7xl mx-auto py-12 px-6">
        <Stories />
      </div>
    </main>
  </Provider>
);

export { App };
