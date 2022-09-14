import parse from 'date-fns/parse';
import format from 'date-fns-tz/format';
import ja from 'date-fns/locale/ja';
import { dateFormat } from '@hacker-mainichi/client/lib/dateFormat';

const getLocaleFormattedDate = (date: string) => format(parse(date, dateFormat, new Date()), 'eee', { locale: ja });

export { getLocaleFormattedDate };
