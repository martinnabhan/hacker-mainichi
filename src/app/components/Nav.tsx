import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { dayChanged, getDateFromDay, selectDate, sortedDays } from '../../modules/days';
import { NowButton } from './NowButton';

export const classes = {
  base: 'px-2 sm:px-3 py-1.5 sm:py-2 rounded-md text-sm font-medium',
  active: 'bg-primary text-white cursor-default',
  inactive: 'text-subtitle hover-hover:hover:bg-title hover-hover:hover:text-white',
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
        <a className={`${classes.base} ${classes.active}`} key={date}>
          {day}
        </a>
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
    <nav className="bg-white border-b border-borderColor shadow-sm">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between h-24 sm:h-16">
          <div className="flex items-center py-2 sm:py-0">
            <h1 className="font-bold text-primary text-xl">ハッカー毎日</h1>
          </div>

          <div className="md:block">
            <div className="flex items-baseline divide-x pb-4 sm:pb-0">
              <NowButton currentDate={currentDate} />
              <div className="flex pl-2 sm:pl-4 space-x-2 sm:space-x-4">{buttons}</div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export { Nav };
