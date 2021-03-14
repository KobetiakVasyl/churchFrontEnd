export interface AdvertisementCardInfo {
  title: string;
  description: string;
  images: CardImage[];
}

export interface PilgrimageCardInfo {
  title: string;
  description: string;
  images: CardImage[];
}

export interface PilgrimageSelectedCard extends CardImage {
  isFirst: boolean;
  isLast: boolean;
  indexInImagesArray: number;
}

export interface CardImage {
  src: string;
  alt: string;
}

export interface Church {
  id: number;
  name: string;
}
