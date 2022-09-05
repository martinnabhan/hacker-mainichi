import format from 'date-fns-tz/format';
import { dateFormat } from '@hacker-mainichi/lib/dateFormat';

const getFormattedDate = (date: Date) => format(date, dateFormat);

export { getFormattedDate };
