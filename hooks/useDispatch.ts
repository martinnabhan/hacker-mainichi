import { useDispatch as useReduxDispatch } from 'react-redux';
import { store } from '@hacker-mainichi/state/store';

const useDispatch = useReduxDispatch<typeof store.dispatch>;

export { useDispatch };
