export interface Week {
  week: Day[]
}

export interface Day {
  value: {
    pure: Date;
    formatted: string;
  };
  isToday: boolean;
  isDisabled: boolean;
  events: CalendarEvent[]
}

export interface CalendarEvent {
  date: string;
  type: string;
  text: string;
}
