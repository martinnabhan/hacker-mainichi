import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { dates } from '@hacker-mainichi/client/lib/dates';
import { getLocaleFormattedDate } from '@hacker-mainichi/client/lib/getLocaleFormattedDate';
import { NavButton } from '@hacker-mainichi/client/components/NavButton';

const Nav = () => {
  const router = useRouter();

  const buttons = dates.map(date => {
    const localeFormattedDate = getLocaleFormattedDate(date);

    return (
      <NavButton href={router.query.date === date ? undefined : `/${date}`} key={date}>
        {localeFormattedDate}
      </NavButton>
    );
  });

  return (
    <nav className="bg-white dark:bg-secondary-dark border-b border-border-color dark:border-border-color-dark shadow-sm">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between h-24 sm:h-16">
          <Link href="/">
            <a className="flex items-center py-2 sm:py-0">
              <Image alt="ハッカー毎日" height="42" src="/logo.svg" width="155" />
            </a>
          </Link>

          <div className="md:block">
            <div className="flex items-baseline divide-x pb-4 sm:pb-0 space-x-2 sm:space-x-4">
              <NavButton href={router.asPath === '/' ? undefined : '/'}>今</NavButton>
              <div className="flex pl-2 sm:pl-4 space-x-2 sm:space-x-4 dark:border-border-color-dark">{buttons}</div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export { Nav };
