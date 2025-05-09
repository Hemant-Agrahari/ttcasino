import { Box, IconButton, InputAdornment } from '@mui/material';
import { useFormik } from 'formik';
import { removeUser, setResetPasswordToken } from '@/redux/user/userReducer';
import { useAppDispatch } from '@/redux/hooks';
import { toast } from 'react-toastify';
import { CustomButton, CustomMuiOutlinedInput } from '@/component/common';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { validationMsg } from '@/utils/validationMsg';
import { withZodSchema } from 'formik-validator-zod';
import FormErrorMessage from '../common/FormErrorMessage';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { resetPasswordRegex } from '@/utils/regex';
import CheckIcon from '@mui/icons-material/Check';
import { useEffect, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useResetPasswordMutation } from '@/redux/user/userSlice';
import { handleError } from '@/utils/errorHandler';
import { RTKError } from '@/types/user';
import { zodErrorValidation } from '@/utils/commonMethod';

const ResetPasswordPopup: React.FC = () => {
  const router = useRouter();
  const { token } = router.query;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [resetPasswordService, { isLoading }] = useResetPasswordMutation();

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const validationSchema = z
    .object({
      resetpassword: zodErrorValidation({
        requireMsg: t(validationMsg.password.require),
        regex: resetPasswordRegex,
        regexMsg: t(validationMsg.password.match),
        min: 6,
        minMsg: t(validationMsg.password.min),
        max: 20,
        maxMsg: t(validationMsg.password.max),
      }),
      confirmPassword: z
        .string()
        .nonempty(t(validationMsg.confirmPassword.require)),
    })
    .refine((data) => data.resetpassword === data.confirmPassword, {
      message: t(validationMsg.confirmPassword.match),
      path: ['confirmPassword'],
    });

  type ValidationSchemaType = z.infer<typeof validationSchema>;

  const formik = useFormik<ValidationSchemaType>({
    initialValues: {
      resetpassword: '',
      confirmPassword: '',
    },
    validate: withZodSchema(validationSchema),
    onSubmit: async (values) => {
      try {
        const obj = {
          password: values.resetpassword,
          confirmPassword: values.confirmPassword,
        };

        const res = await resetPasswordService(obj).unwrap();
        if (res.status === 'success') {
          toast.success(res?.message);
          dispatch(removeUser());
          formik.resetForm();
        } else {
          toast.error(res?.message);
        }
      } catch (error: unknown) {
        handleError(error as RTKError);
      } finally {
        router.push('/');
      }
    },
  });

  useEffect(() => {
    dispatch(removeUser());
    if (!router.isReady) return;

    if (!token) {
      router.push('/');
    } else {
      if (typeof token === 'string') dispatch(setResetPasswordToken(token));
    }
  }, [router.isReady, token]);

  return (
    <div className="resetPassword-container ">
      <div className="resetPassword">
        <div className="">
          <div>
            <h2 className="m-3 mb-4 text-center font-size-22 text-white">
              {t('Reset Password')}
            </h2>
            <Box>
              <form onSubmit={formik.handleSubmit}>
                <Box className="mb-3">
                  <CustomMuiOutlinedInput
                    className="forgot-password-input"
                    id="input-with-icon-textfield"
                    placeholder={t('Reset Password')}
                    type={showPassword ? 'text' : 'password'}
                    startAdornment={
                      <InputAdornment position="start">
                        <LockOpenIcon className="text-white" />
                      </InputAdornment>
                    }
                    fullWidth
                    endAdornment={
                      <InputAdornment position="start">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword((show) => !show)}
                          onMouseDown={() => handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOff className="text-white" />
                          ) : (
                            <Visibility className="text-white" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    {...formik.getFieldProps('resetpassword')}
                  />
                  <FormErrorMessage
                    touched={formik.touched?.resetpassword}
                    error={formik.errors?.resetpassword}
                  />
                </Box>
                <Box>
                  <CustomMuiOutlinedInput
                    className="forgot-password-input"
                    id="input-with-icon-textfield"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder={t('Confirm Password')}
                    startAdornment={
                      <InputAdornment position="start">
                        <CheckIcon className="text-white" />
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="start">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() =>
                            setShowConfirmPassword((show) => !show)
                          }
                          onMouseDown={() => handleMouseDownPassword}
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff className="text-white" />
                          ) : (
                            <Visibility className="text-white" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    fullWidth
                    {...formik.getFieldProps('confirmPassword')}
                  />
                  <FormErrorMessage
                    touched={formik.touched?.confirmPassword}
                    error={formik.errors?.confirmPassword}
                  />
                </Box>
                <CustomButton
                  className="modal-btn-losign mt-3"
                  type="submit"
                  isLoading={isLoading}
                >
                  {t('Submit')}
                </CustomButton>
              </form>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPopup;
