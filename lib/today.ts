import format from 'date-fns-tz/format';
import { dateFormat } from '@hacker-mainichi/lib/dateFormat';

const today = format(new Date(new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })), dateFormat);

export { today };
