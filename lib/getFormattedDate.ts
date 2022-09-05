import { format } from 'date-fns-tz';

const getFormattedDate = (date: Date) => format(date, 'yyyyMMdd');

export { getFormattedDate };
