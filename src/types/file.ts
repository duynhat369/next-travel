export interface UploadedFile {
  id: string;
  name: string;
  url: string;
  size: number;
  progress?: number;
}
