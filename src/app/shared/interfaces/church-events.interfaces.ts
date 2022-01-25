export interface IChurchEvent {
  readonly id: number
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  date: string,
  churchId: number;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateChurchEvent {
  churchId: number;
  name: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
}

export interface IUpdateChurchEvent extends ICreateChurchEvent {
  id: number;
}
