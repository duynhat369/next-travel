export interface UploadAuthResponse {
  token: string;
  expire: number;
  signature: string;
  publicKey: string;
}
