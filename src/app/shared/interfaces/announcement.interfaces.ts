import {IImagesList} from "./image.interfaces";
import {PartialList} from "./pagination.interfaces";

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

export type IAnnouncementPartialList = PartialList<IAnnouncement>;
