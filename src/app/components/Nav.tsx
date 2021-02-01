import { useDispatch, useSelector } from 'react-redux';
import { dayChanged, days, selectDay, yesterdayDay } from '../../modules/days';

const classes = {
  button: 'px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium',
  active: 'bg-primary text-white cursor-default',
  inActive: 'text-subtitle hover:bg-title hover:text-white',
};

const daysReverse = [...days].reverse();
const yesterdayIndex = daysReverse.indexOf(yesterdayDay);

const navDays: Parameters<typeof dayChanged>[0]['day'][] = [
  '今日',
  ...daysReverse.slice(yesterdayIndex),
  ...daysReverse.slice(0, yesterdayIndex),
];

const Nav = () => {
  const dispatch = useDispatch();
  const currentDay = useSelector(selectDay);

  const buttons = navDays.map(day => (
    <button
      className={`${classes.button} ${day === currentDay ? classes.active : classes.inActive}`}
      disabled={day === currentDay}
      key={day}
      onClick={() => dispatch(dayChanged({ day }))}
    >
      {day}
    </button>
  ));

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
