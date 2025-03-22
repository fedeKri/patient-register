import axios, { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import { useState, useCallback } from 'react';

interface UseAsyncOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  successMessage?: string;
  errorMessage?: string;
}

export const useAsync = <T,>({
  onSuccess,
  onError,
  successMessage,
  errorMessage = 'An error occurred',
}: UseAsyncOptions<T> = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(
    async (asyncFunction: () => Promise<T>) => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await asyncFunction();

        if (successMessage) {
          toast.success(successMessage);
        }
        onSuccess?.(data);
        return data;
      } catch (err) {
        let message = errorMessage;


        if (axios.isAxiosError(err)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const axiosError = err as AxiosError<any>;

          if (axiosError.response?.status === 422 && axiosError.response.data?.errors) {
        
            const errors = axiosError.response.data.errors;
            
            const allMessages = Object.values(errors)
              .flat()
              .join('\n');
            message = allMessages;
          } else if (axiosError.response?.data?.message) {
            
            message = axiosError.response.data.message;
          }
        }

        setError(message);
        toast.error(message);
        onError?.(err as Error);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [onSuccess, onError, successMessage, errorMessage]
  );

  return {
    isLoading,
    error,
    execute,
  };
};
