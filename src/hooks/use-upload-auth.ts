import axiosClient from '@/lib/axios';
import { useCallback, useState } from 'react';

interface UploadAuthResponse {
  signature: string;
  expire: number;
  token: string;
  publicKey: string;
}

interface UseUploadAuthReturn {
  authenticate: () => Promise<UploadAuthResponse>;
  isLoading: boolean;
  error: string | null;
}

export const useUploadAuth = (): UseUploadAuthReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const authenticate = useCallback(async (): Promise<UploadAuthResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const response: UploadAuthResponse = await axiosClient.get('/upload-auth');
      const { signature, expire, token, publicKey } = response;
      return { signature, expire, token, publicKey };
    } catch (error) {
      console.error('Authentication error:', error);
      const errorMessage = 'Authentication request failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    authenticate,
    isLoading,
    error,
  };
};
