import Link from 'next/link';
import { FunctionComponent, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  href?: string;
}

const NavButton: FunctionComponent<Props> = ({ children, href }) =>
  href ? (
    <Link href={href}>
      <a className="rounded-md px-2 py-1.5 text-sm font-medium text-[#9c9ea2] hover:bg-[#3a3b3c] sm:px-3 sm:py-2">
        {children}
      </a>
    </Link>
  ) : (
    <p className="cursor-default rounded-md bg-[#506bf0] px-2 py-1.5 text-sm font-medium text-[#e4e6eb] sm:px-3 sm:py-2">
      {children}
    </p>
  );

export { NavButton };
