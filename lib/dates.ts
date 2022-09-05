import { subDays } from 'date-fns';

const today = new Date(new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' }));
const dates = [...new Array(7)].map((_, index) => subDays(today, index + 1));

export { dates };
