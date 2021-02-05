import Link from 'next/link';
import { useRouter } from 'next/router';
import { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { dayChanged, todayDate } from '../../modules/days';
import { classes } from './Nav';

interface Props {
  currentDate: string;
}

const NowButton: FunctionComponent<Props> = ({ currentDate }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  if (router.route !== '/404' && currentDate === todayDate) {
    return (
      <a className={`${classes.base} ${classes.active} mr-2 sm:mr-4`} key="今">
        今
      </a>
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
