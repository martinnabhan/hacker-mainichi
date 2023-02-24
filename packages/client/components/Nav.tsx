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
    <nav className="sticky top-0 z-10 flex w-full items-center gap-4 border-b border-[#393a3b] bg-[#242526] px-4 pt-2 pb-4 shadow md:px-5 md:py-4">
      <div className="flex w-full flex-col items-center justify-between gap-2 sm:flex-row">
        <button
          className="mr-auto flex items-center gap-x-2 py-2 md:py-0"
          onClick={() => window.scrollTo({ behavior: 'smooth', top: 0 })}
          type="button"
        >
          <NavButton className="text-lg md:text-2xl">H</NavButton>

          <h1 className="text-lg font-bold text-[#506bf0]">ハッカー毎日</h1>
        </button>

        <div className="flex gap-2">
          <NavButton href={router.asPath === '/' ? undefined : '/'}>今</NavButton>
          {buttons}
        </div>
      </div>

      <SignInButton />
    </nav>
  );
};

export { Nav };
