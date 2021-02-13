import * as dayjs from "dayjs";

export interface Week {
  week: Day[]
}

export interface Day {
  value: dayjs.Dayjs;
  isToday: boolean;
  isActive: boolean;
  isDisabled: boolean;
  events: CalendarEvent[]
}

export interface CalendarEvent {
  date: string;
  type: string;
  text: string;
}
