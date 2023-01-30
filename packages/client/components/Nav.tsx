import { SignInButton } from '@hacker-mainichi/auth/components';
import { NavButton } from '@hacker-mainichi/client/components/NavButton';
import { dates } from '@hacker-mainichi/client/lib/dates';
import { getLocaleFormattedDate } from '@hacker-mainichi/client/lib/getLocaleFormattedDate';
import { useRouter } from 'next/router';

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
    <nav className="flex w-full items-center gap-4 border-b border-[#393a3b] bg-[#242526] px-4 pt-2 pb-4 shadow-sm md:pb-2">
      <div className="flex w-full flex-col items-center justify-between gap-2 sm:flex-row">
        <div className="mr-auto flex items-center gap-x-2 py-2 md:py-0">
          <NavButton className="text-xl font-bold md:text-2xl">H</NavButton>

          <h1 className="text-lg font-bold text-[#506bf0]">ハッカー毎日</h1>
        </div>

        <div className="flex items-center gap-2 divide-x divide-[#393a3b]">
          <NavButton href={router.asPath === '/' ? undefined : '/'}>今</NavButton>
          <div className="flex gap-2 pl-2">{buttons}</div>
        </div>
      </div>

      <SignInButton />
    </nav>
  );
};

export { Nav };
