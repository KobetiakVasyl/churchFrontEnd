export interface Church extends ChurchListItem {
  location: string;
  email: string;
  phoneNumber: string;
  description: string;
  images: {
    readonly id: number;
    readonly url: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ChurchListItem {
  readonly id: number;
  name: string;
  deanery: string;
  diocese: string;
  prior: string;
}

export interface CreateChurchBody {
  name: string;
  location: string;
  deanery: string;
  diocese: string;
  prior: string;
  email: string;
  phoneNumber: string;
  description: string;
}
