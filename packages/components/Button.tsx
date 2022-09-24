import { Spinner } from '@hacker-mainichi/components/Spinner';
import clsx from 'clsx';
import { ButtonHTMLAttributes, FunctionComponent, ReactNode } from 'react';

type Props = Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'disabled' | 'onClick'> & {
  children: ReactNode;
  loading?: boolean;
};

const Button: FunctionComponent<Props> = ({ children, loading, onClick, ...props }) => {
  const disabled = props.disabled || loading;

  return (
    <button
      className={clsx(
        !disabled && 'bg-[#506bf0] shadow md:hover:shadow-md md:active:shadow-inner',
        'flex h-11 w-11 shrink-0 items-center justify-center rounded focus:outline-none disabled:cursor-not-allowed disabled:bg-[#3a3b3c] disabled:text-[#9c9ea2]',
      )}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {loading ? <Spinner width="w-full" /> : children}
    </button>
  );
};

export { Button };
