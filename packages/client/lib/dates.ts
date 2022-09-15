import { dateFormat } from '@hacker-mainichi/client/lib/dateFormat';
import { getFormattedDate } from '@hacker-mainichi/client/lib/getFormattedDate';
import { today } from '@hacker-mainichi/client/lib/today';
import { parse, subDays } from 'date-fns';

const todayDate = parse(today, dateFormat, new Date());

const dates = [...new Array(7)].map((_, index) => getFormattedDate(subDays(todayDate, index + 1)));

export { dates };
