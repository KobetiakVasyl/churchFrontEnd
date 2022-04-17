export interface IChurchListItem {
  readonly id: number;
  name: string;
  deanery: string;
  diocese: string;
  prior: string;
}

export interface IChurch extends IChurchListItem {
  location: string;
  email: string;
  phoneNumber: string;
  description: string;
  // TODO: add images type from church image
  images: any[];
}

export type ICreateChurch = Omit<IChurch, 'id' | 'images' | 'createdAt' | 'updatedAt'>;
export type IUpdateChurch = Omit<IChurch, 'images' | 'createdAt' | 'updatedAt'>;
