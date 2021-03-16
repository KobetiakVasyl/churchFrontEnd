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
