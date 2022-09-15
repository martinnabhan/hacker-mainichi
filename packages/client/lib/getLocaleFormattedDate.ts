/* eslint-disable import/no-duplicates */
import { dateFormat } from '@hacker-mainichi/client/lib/dateFormat';
import format from 'date-fns-tz/format';
import ja from 'date-fns/locale/ja';
import parse from 'date-fns/parse';

const getLocaleFormattedDate = (date: string) => format(parse(date, dateFormat, new Date()), 'eee', { locale: ja });

export { getLocaleFormattedDate };
