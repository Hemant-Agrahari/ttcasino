import { RTKError } from '@/types/user';
import { toast } from 'react-toastify';
import { logError } from '.';

export const handleError = (error: RTKError) => {
  const errorData = error as RTKError;
  toast.error(errorData.data?.message);
  logError(error);
};
