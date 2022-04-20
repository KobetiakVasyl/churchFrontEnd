export interface ICreateScheduleEvent {
  description: string;
  name: string;
  startTime: string;
  endTime: string;
  date: string;
  churchId: number;
}

export interface IUpdateScheduleEvent extends ICreateScheduleEvent {
  id: number;
}

export interface IScheduleEvent extends IUpdateScheduleEvent {
  createdAt: string;
  updatedAt: string;
}
