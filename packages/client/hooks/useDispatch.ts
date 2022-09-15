import { store } from '@hacker-mainichi/client/state/store';
import { useDispatch as useReduxDispatch } from 'react-redux';

const useDispatch = useReduxDispatch<typeof store.dispatch>;

export { useDispatch };
