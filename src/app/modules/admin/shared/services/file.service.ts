import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private readonly ALLOWED_IMAGES_EXTENSIONS: string[] = [
    'png',
    'jpeg'
  ];

  isImageExtensionAllowed(fileName: string): boolean {
    const extension = this.getFileExtension(fileName);
    return this.ALLOWED_IMAGES_EXTENSIONS.includes(extension);
  }

  private getFileExtension(fileName: string): string {
    const splittedFileName = fileName.split('.');
    return splittedFileName[splittedFileName.length - 1];
  }
}
