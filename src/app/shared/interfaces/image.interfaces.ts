export interface IImage {
  id: number;
  url: string;
  name: string;
}

export interface IImagesList {
  images: IImage[];
}
