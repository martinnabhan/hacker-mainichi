import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { dates } from '@hacker-mainichi/client/lib/dates';
import { getLocaleFormattedDate } from '@hacker-mainichi/client/lib/getLocaleFormattedDate';
import { NavButton } from '@hacker-mainichi/client/components/NavButton';
import logo from '@hacker-mainichi/client/public/logo.svg';

const Nav = () => {
  const router = useRouter();

  const buttons = dates.map(date => {
    const localeFormattedDate = getLocaleFormattedDate(date);

    return (
      <NavButton key={date} href={router.query.date === date ? undefined : `/${date}`}>
        {localeFormattedDate}
      </NavButton>
    );
  });

  return (
    <nav className="border-b border-border-color bg-white shadow-sm dark:border-border-color-dark dark:bg-secondary-dark">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="flex h-24 flex-col items-center justify-between sm:h-16 sm:flex-row">
          <Link href="/">
            <a className="flex items-center py-2 sm:py-0">
              <Image alt="ハッカー毎日" height="42" priority src={logo} width="155" />
            </a>
          </Link>

          <div className="md:block">
            <div className="flex items-baseline space-x-2 divide-x pb-4 sm:space-x-4 sm:pb-0">
              <NavButton href={router.asPath === '/' ? undefined : '/'}>今</NavButton>
              <div className="flex space-x-2 pl-2 dark:border-border-color-dark sm:space-x-4 sm:pl-4">{buttons}</div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export { Nav };
