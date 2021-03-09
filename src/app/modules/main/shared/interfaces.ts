export interface CardInfo {
  title: string;
  description: string;
  images: CardImage[];
}

export interface CardImage {
  src: string;
  alt: string;
}

export interface Church {
  id: number;
  name: string;
}
