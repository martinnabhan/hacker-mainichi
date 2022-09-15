import { dateFormat } from '@hacker-mainichi/client/lib/dateFormat';
import format from 'date-fns-tz/format';

const getFormattedDate = (date: Date) => format(date, dateFormat);

export { getFormattedDate };
