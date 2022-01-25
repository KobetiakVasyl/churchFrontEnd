import {IImage} from './shared.interfaces';

export interface IAnnouncement {
  id: number;
  churchId: number;
  name: string;
  description: string;
  images: IImage[];
  createdAt: string;
  updatedAt: string;
}

export interface ICreateAnnouncement {
  description: string;
  name: string;
  churchId: number;
}

export interface IUpdateAnnouncement {
  id: number;
  description: string;
  name: string;
}
