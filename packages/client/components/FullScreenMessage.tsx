import { FunctionComponent } from 'react';

interface Props {
  message: string;
}

const FullScreenMessage: FunctionComponent<Props> = ({ message }) => (
  <div className="flex h-full flex-col items-center justify-center">
    <p className="-mt-48 text-title dark:text-subtitle-dark sm:-mt-16 sm:text-5xl">{message}</p>
  </div>
);

export { FullScreenMessage };
