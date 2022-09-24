import { FunctionComponent } from 'react';

interface Props {
  message: string;
}

const FullScreenMessage: FunctionComponent<Props> = ({ message }) => (
  <div className="flex w-full items-center justify-center">
    <p className="-mt-16 sm:text-5xl">{message}</p>
  </div>
);

export { FullScreenMessage };
