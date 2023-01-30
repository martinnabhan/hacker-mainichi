import clsx from 'clsx';
import Link from 'next/link';
import { FunctionComponent, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  href?: string;
}

const classes = 'rounded-md text-sm font-medium flex items-center justify-center h-7 lg:h-9 w-7 lg:w-9';

const NavButton: FunctionComponent<Props> = ({ className, children, href }) =>
  href ? (
    <Link href={href}>
      <a className={clsx(classes, className, 'text-[#9c9ea2] hover:bg-[#3a3b3c]')}>{children}</a>
    </Link>
  ) : (
    <p className={clsx(classes, className, 'bg-[#506bf0] text-[#e4e6eb]')}>{children}</p>
  );

export { NavButton };
