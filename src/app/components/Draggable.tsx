import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dates, selectDate, selectDay, selectX, xChanged } from '../../modules/days';

const Draggable: FunctionComponent = ({ children }) => {
  const date = useSelector(selectDate);
  const day = useSelector(selectDay);
  const dispatch = useDispatch();
  const x = useSelector(selectX);
  const router = useRouter();

  const [width, setWidth] = useState(0);

  const paginate = (direction: 'left' | 'right') => {
    dispatch(xChanged({ x: direction === 'left' ? width : width * -1 }));

    if (day === '今') {
      router.push(`/${dates[direction === 'left' ? 0 : dates.length - 1]}`);
      return;
    }

    const dateIndex = dates.indexOf(date);

    if (direction === 'left') {
      router.push(`/${dateIndex === dates.length - 1 ? '' : dates[dateIndex + 1]}`);
    } else {
      router.push(`/${dateIndex === 0 ? '' : dates[dateIndex - 1]}`);
    }
  };

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  return (
    <motion.div
      animate={{ x: 0 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      dragTransition={{ bounceStiffness: 400, bounceDamping: 30 }}
      initial={{ x }}
      key={date}
      onDragEnd={(_, { offset }) => Math.abs(offset.x) > width * 0.75 && paginate(offset.x < 0 ? 'left' : 'right')}
    >
      {children}
    </motion.div>
  );
};

export { Draggable };
