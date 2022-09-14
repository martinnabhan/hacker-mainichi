import parse from 'date-fns/parse';
import subDays from 'date-fns/subDays';
import { today } from '@hacker-mainichi/client/lib/today';
import { getFormattedDate } from '@hacker-mainichi/client/lib/getFormattedDate';
import { dateFormat } from '@hacker-mainichi/client/lib/dateFormat';

const todayDate = parse(today, dateFormat, new Date());

const dates = [...new Array(7)].map((_, index) => getFormattedDate(subDays(todayDate, index + 1)));

export { dates };
