import { store } from '@hacker-mainichi/state/store';
import { useDispatch as useReduxDispatch } from 'react-redux';

const useDispatch = useReduxDispatch<typeof store.dispatch>;

export { useDispatch };
