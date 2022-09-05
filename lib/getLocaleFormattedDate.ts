import { format } from 'date-fns-tz';
import { ja } from 'date-fns/locale';

const getLocaleFormattedDate = (date: Date) => format(date, 'eee', { locale: ja });

export { getLocaleFormattedDate };
