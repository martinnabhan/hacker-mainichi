import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { dayChanged, getDateFromDay, selectDate, sortedDays } from '../../modules/days';
import { NowButton } from './NowButton';

export const classes = {
  base: 'px-2 sm:px-3 py-1.5 sm:py-2 rounded-md text-sm font-medium',
  active: 'bg-primary text-white dark:text-title-dark cursor-default',
  inactive:
    'text-subtitle dark:text-subtitle-dark hover-hover:hover:bg-title hover-hover:hover:text-white dark:hover-hover:hover:text-title-dark',
};

const links = sortedDays.map(day => ({
  date: getDateFromDay(day),
  day,
}));

const Nav = () => {
  const currentDate = useSelector(selectDate);
  const dispatch = useDispatch();
  const router = useRouter();

  const buttons = links.map(({ date, day }) => {
    if (router.route !== '/404' && date === currentDate) {
      return (
        <p className={`${classes.base} ${classes.active}`} key={date}>
          {day}
        </p>
      );
    }

    return (
      <Link href={`/${date}`} key={date}>
        <a className={`${classes.base} ${classes.inactive}`} onClick={() => dispatch(dayChanged({ date, day }))}>
          {day}
        </a>
      </Link>
    );
  });

  return (
    <nav className="bg-white dark:bg-secondary-dark border-b border-border-color dark:border-border-color-dark shadow-sm">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between h-24 sm:h-16">
          <div className="flex items-center py-2 sm:py-0">
            <img alt="ハッカー毎日" height="42" src="/logo.svg" width="155" />
          </div>

          <div className="md:block">
            <div className="flex items-baseline divide-x pb-4 sm:pb-0">
              <NowButton />
              <div className="flex pl-2 sm:pl-4 space-x-2 sm:space-x-4 dark:border-border-color-dark">{buttons}</div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export { Nav };
