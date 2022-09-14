import { useDispatch as useReduxDispatch } from 'react-redux';
import { store } from '@hacker-mainichi/client/state/store';

const useDispatch = useReduxDispatch<typeof store.dispatch>;

export { useDispatch };
