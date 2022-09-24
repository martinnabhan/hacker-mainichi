import clsx from 'clsx';
import { FunctionComponent } from 'react';

interface Props {
  className?: string;
  width?: string;
}

const Spinner: FunctionComponent<Props> = ({ className, width = 'w-5' }) => (
  <svg
    className={clsx(className, width, '-ml-0.5 h-5 animate-spin text-white')}
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />

    <path
      className="opacity-75"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      fill="currentColor"
    />
  </svg>
);

export { Spinner };
