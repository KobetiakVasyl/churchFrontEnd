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

export interface Week {
  week: Day[];
}

export interface Day {
  value: {
    pure: Date;
    formatted: string;
  };
  isToday: boolean;
  isDisabled: boolean;
  events: CalendarEvent[];
}

export interface CalendarEvent {
  date: string;
  type: string;
  text: string;
}

export type SnackbarType = 'info' | 'success' | 'error';

export interface Snackbar {
  id: number;
  message: string;
  isSynchronous: boolean;
  type: SnackbarType;
}

export interface SnackbarRef {
  close: () => void;
}

export interface AdminSimpleTableRecord {
  id: number;

  [key: string]: any;
}

export interface PhoneViewListDisplayOption {
  key: string;
  label: string;
}
