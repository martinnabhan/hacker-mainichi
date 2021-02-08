import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { dayChanged, selectDate, todayDate } from '../../modules/days';
import { classes } from './Nav';

const NowButton = () => {
  const date = useSelector(selectDate);
  const dispatch = useDispatch();
  const router = useRouter();

  if (router.route !== '/404' && date === todayDate) {
    return (
      <p className={`${classes.base} ${classes.active} mr-2 sm:mr-4`} key="今">
        今
      </p>
    );
  }

  return (
    <Link href="/" key="今">
      <a
        className={`${classes.base} ${classes.inactive} mr-2 sm:mr-4`}
        onClick={() => dispatch(dayChanged({ date: todayDate, day: '今' }))}
      >
        今
      </a>
    </Link>
  );
};

export { NowButton };
