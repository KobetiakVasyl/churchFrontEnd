import {IImage} from './shared.interfaces';

export interface IChurch extends IChurchItem {
  location: string;
  email: string;
  phoneNumber: string;
  description: string;
  images: IImage[];
  createdAt: string;
  updatedAt: string;
}

export interface IChurchItem {
  readonly id: number;
  name: string;
  deanery: string;
  diocese: string;
  prior: string;
}

export interface ICreateChurch {
  name: string;
  location: string;
  deanery: string;
  diocese: string;
  prior: string;
  email: string;
  phoneNumber: string;
  description: string;
}

export interface IUpdateChurch {
  id: number;
  name: string;
  location: string;
  deanery: string;
  diocese: string;
  prior: string;
  email: string;
  phoneNumber: string;
  description: string;
}
