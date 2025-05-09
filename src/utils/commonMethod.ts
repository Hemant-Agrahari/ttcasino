import { toast } from 'react-toastify';
import { z } from 'zod';
export const copyToClipboard = async (text: string, successMessage: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success(successMessage);
  } catch (error) {
    toast.error('Failed to copy!');
  }
};

/**
 * A custom method for Zod validation that checks for required input,
 * minimum and maximum length, and pattern matching using regex,
 * with customizable error messages for each condition.
 *
 * This method is useful because Zod treats an empty string as a valid value by default.
 * It helps explicitly show a "required" error when the input is empty.
 */

export const zodErrorValidation = ({
  requireMsg,
  regex,
  regexMsg,
  min,
  minMsg,
  max,
  maxMsg,
}: {
  requireMsg: string;
  regex?: RegExp;
  regexMsg?: string;
  min?: number;
  minMsg?: string;
  max?: number;
  maxMsg?: string;
}) =>
  z.string().superRefine((val, ctx) => {
    const formValue = val;
    if (!formValue) {
      ctx.addIssue({ code: 'custom', message: requireMsg });
      return;
    }
    if (min !== undefined && formValue.length < min) {
      ctx.addIssue({
        code: 'custom',
        message: minMsg || `Minimum ${min} characters`,
      });
      return;
    }
    if (max !== undefined && formValue.length > max) {
      ctx.addIssue({
        code: 'custom',
        message: maxMsg || `Maximum ${max} characters`,
      });
      return;
    }
    if (regex && !regex.test(formValue)) {
      ctx.addIssue({ code: 'custom', message: regexMsg || 'Invalid format' });
      return;
    }
  });
