import { FunctionComponent } from 'react';

interface Props {
  message?: string;
}

const NotFound: FunctionComponent<Props> = ({ message }) => (
  <div className="flex justify-center items-center h-full flex-col">
    <p className="text-title text-4xl -mt-24 sm:-mt-16">{message || '404'}</p>
  </div>
);

export { NotFound };

export default NotFound;
