import { FunctionComponent } from 'react';

interface Props {
  message?: string;
}

const FullScreenMessage: FunctionComponent<Props> = ({ message }) => (
  <div className="flex justify-center items-center h-full flex-col">
    <p className="text-title dark:text-subtitle-dark text-l sm:text-5xl -mt-48 sm:-mt-16">{message}</p>
  </div>
);

export { FullScreenMessage };
