import Link from 'next/link';
import { FunctionComponent, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  href?: string;
}

const NavButton: FunctionComponent<Props> = ({ children, href }) =>
  href ? (
    <Link href={href}>
      <a className="px-2 sm:px-3 py-1.5 sm:py-2 rounded-md text-sm font-medium text-subtitle dark:text-subtitle-dark hover:bg-title">
        {children}
      </a>
    </Link>
  ) : (
    <p className="px-2 sm:px-3 py-1.5 sm:py-2 rounded-md text-sm font-medium bg-primary text-white dark:text-title-dark cursor-default">
      {children}
    </p>
  );

export { NavButton };
