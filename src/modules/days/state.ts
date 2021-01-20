import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addDays, format, subDays } from 'date-fns';
import { State } from '../../app/reducer';

type Day = '月' | '火' | '水' | '木' | '金' | '土' | '日';
type Today = '今日';

const dateFormat = 'yyyyMMdd';
const days: Day[] = ['月', '火', '水', '木', '金', '土', '日'];

const todayDate = format(new Date(), dateFormat);

const yesterday = subDays(new Date(), 1);
const yesterdayDate = format(yesterday, dateFormat);
const yesterdayDay = days[yesterday.getDay() - 1];
const yesterdayIndex = days.indexOf(yesterdayDay);

const { actions, reducer } = createSlice({
  name: 'days',
  initialState: {
    date: todayDate,
    day: '今日' as Day | Today,
  },
  reducers: {
    dayChanged: (state, { payload }: PayloadAction<{ day: Day | Today }>) => {
      if (payload.day === '今日') {
        state.date = todayDate;
      } else {
        const dayIndex = days.indexOf(payload.day);
        const dayDiff = dayIndex - yesterdayIndex;

        let dayDate = yesterdayDate;

        if (dayDiff > 0) {
          dayDate = format(subDays(yesterday, days.length - dayDiff), dateFormat);
        } else if (dayDiff < 0) {
          dayDate = format(addDays(yesterday, dayDiff), dateFormat);
        }

        state.date = dayDate;
      }

      state.day = payload.day;
    },
  },
});

const { dayChanged } = actions;

const selectDate = (state: State) => state.days.date;
const selectDay = (state: State) => state.days.day;

export { dayChanged, days, reducer, selectDate, selectDay, todayDate, yesterdayDay };
