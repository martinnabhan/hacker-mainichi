import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { format, subDays } from 'date-fns';
import { State } from '../../app/reducer';

type Day = '月' | '火' | '水' | '木' | '金' | '土' | '日';
type Today = '今日';

const dateFormat = 'yyyyMMdd';
const days: Day[] = ['月', '火', '水', '木', '金', '土', '日'];
const daysReverse = [...days].reverse();

const today = new Date();
const todayDate = format(today, dateFormat);

const dates = [...Array(days.length).keys()].map(index => format(subDays(today, index + 1), 'yyyyMMdd'));

const yesterday = subDays(today, 1);
const yesterdayDay = days[yesterday.getDay() - 1];
const yesterdayReverseIndex = daysReverse.indexOf(yesterdayDay);

const sortedDays: Parameters<typeof dayChanged>[0]['day'][] = [
  ...daysReverse.slice(yesterdayReverseIndex),
  ...daysReverse.slice(0, yesterdayReverseIndex),
];

const getDateFromDay = (day: Day) => dates[sortedDays.indexOf(day)];
const getDayFromDate = (date: string) => sortedDays[dates.indexOf(date)];

const initialState = {
  date: todayDate,
  day: '今日' as Day | Today,
};

const { actions, reducer } = createSlice({
  name: 'days',
  initialState,
  reducers: {
    dayChanged: (state, { payload }: PayloadAction<{ date: string; day: Day | Today }>) => {
      state.date = payload.date;
      state.day = payload.day;
    },
  },
});

const { dayChanged } = actions;

const selectDate = (state: State) => state.days.date;
const selectDay = (state: State) => state.days.day;

export {
  dayChanged,
  dates,
  days,
  getDateFromDay,
  getDayFromDate,
  initialState,
  reducer,
  selectDate,
  selectDay,
  sortedDays,
  todayDate,
  yesterdayDay,
};
