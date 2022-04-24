import {IImagesList} from "./image.interfaces";

export interface ICreateAnnouncement {
  churchId: number;
  name: string;
  description: string;
}

export interface IUpdateAnnouncement extends Omit<ICreateAnnouncement, 'churchId'> {
  id: number;
}

export interface IAnnouncement extends ICreateAnnouncement, IImagesList {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface IAnnouncementDateRange {
  from: null | Date;
  to: Date;
}
