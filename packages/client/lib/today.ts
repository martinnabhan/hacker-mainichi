import { dateFormat } from '@hacker-mainichi/client/lib/dateFormat';
import format from 'date-fns-tz/format';

const today = format(new Date(new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })), dateFormat);

export { today };
