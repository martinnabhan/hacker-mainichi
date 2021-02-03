import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { dayChanged, getDateFromDay, selectDate, sortedDays, todayDate } from '../../modules/days';

const buttonClasses = 'px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium';

const sortedDaysWithToday: Parameters<typeof dayChanged>[0]['day'][] = ['今日', ...sortedDays];

const links = sortedDaysWithToday.map(day => ({
  date: day === '今日' ? todayDate : getDateFromDay(day),
  day,
}));

const Nav = () => {
  const currentDate = useSelector(selectDate);
  const dispatch = useDispatch();
  const router = useRouter();

  const buttons = links.map(({ date, day }) => {
    if (router.route !== '/404' && date === currentDate) {
      return (
        <a className={`${buttonClasses} bg-primary text-white cursor-default`} key={date}>
          {day}
        </a>
      );
    }

    return (
      <Link href={day === '今日' ? '/' : `/${date}`} key={date}>
        <a
          className={`${buttonClasses} text-subtitle hover:bg-title hover:text-white`}
          onClick={() => dispatch(dayChanged({ date, day }))}
        >
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
            <div className="flex items-baseline space-x-2 sm:space-x-4 pb-4 sm:pb-0">{buttons}</div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export { Nav };
