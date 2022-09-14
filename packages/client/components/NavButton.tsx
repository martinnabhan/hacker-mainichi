import Link from 'next/link';
import { FunctionComponent, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  href?: string;
}

const NavButton: FunctionComponent<Props> = ({ children, href }) =>
  href ? (
    <Link href={href}>
      <a className="rounded-md px-2 py-1.5 text-sm font-medium text-subtitle hover:bg-title dark:text-subtitle-dark sm:px-3 sm:py-2">
        {children}
      </a>
    </Link>
  ) : (
    <p className="cursor-default rounded-md bg-primary px-2 py-1.5 text-sm font-medium text-white dark:text-title-dark sm:px-3 sm:py-2">
      {children}
    </p>
  );

export { NavButton };
