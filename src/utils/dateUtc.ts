import { toZonedTime } from 'date-fns-tz';
import { format } from 'date-fns';
export const gmt8Time = (date: Date | string | number): string => {
  const timeZone: string = 'Asia/Kolkata'; // GMT+8 Timezone
  const zonedDate: Date = toZonedTime(new Date(date), timeZone);
  return format(zonedDate, 'MMMM d, yyyy h:mm a');
};
