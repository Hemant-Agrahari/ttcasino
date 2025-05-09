import { Box, InputAdornment } from '@mui/material';
import { FormikHelpers, useFormik } from 'formik';
import { toast } from 'react-toastify';
import { CustomButton, CustomMuiOutlinedInput } from '@/component/common';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { validationMsg } from '@/utils/validationMsg';
import { withZodSchema } from 'formik-validator-zod';
import FormErrorMessage from '../common/FormErrorMessage';
import CustomImage from '../common/CustomImage';
import { useForgetPasswordMutation } from '@/redux/user/userSlice';
import { handleError } from '@/utils/errorHandler';
import { RTKError } from '@/types/user';

interface _props {
  handleCloseForgetPassword: () => void;
}

const ForgetPasswordPopup: React.FC<_props> = ({
  handleCloseForgetPassword,
}) => {
  const { t } = useTranslation();
  const [forgetPasswordService, { isLoading }] = useForgetPasswordMutation();

  const validationSchema = z.object({
    resetEmail: z
      .string()
      .email(`${t(validationMsg.email.invalidEmail)}`)
      .nonempty(t(validationMsg.email.require)),
  });
  type ValidationSchemaType = z.infer<typeof validationSchema>;

  const formik = useFormik<ValidationSchemaType>({
    initialValues: {
      resetEmail: '',
    },
    validate: withZodSchema(validationSchema),
    onSubmit: async (
      values: { resetEmail: string },
      formikHelpers: FormikHelpers<{ resetEmail: string }>,
    ) => {
      try {
        const obj = {
          email: values?.resetEmail,
        };

        const res = await forgetPasswordService(obj).unwrap();

        if (res.status === 'success') {
          toast.success(res?.message);
          formikHelpers.resetForm();
          handleCloseForgetPassword();
        } else {
          toast.error(res?.message);
        }
      } catch (error: unknown) {
        handleError(error as RTKError);
      }
    },
  });

  return (
    <div className="modal-content">
      <div className="modal_closebtn">
        <CustomButton
          type="button"
          className="close_form_btn m-1"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={handleCloseForgetPassword}
        >
          <CloseIcon className="text-white font-size-32" />
        </CustomButton>
      </div>
      <div className="modal-body">
        <div className="modal_form_signIn">
          <div>
            <h2 className="m-3 mb-4 text-center font-size-22 text-white">
              {t('Forgot Password')}
            </h2>
            <Box>
              <form onSubmit={formik.handleSubmit} noValidate>
                <Box className="mb-3">
                  <CustomMuiOutlinedInput
                    className="forgot-password-input"
                    id="input-with-icon-textfield"
                    type="email"
                    placeholder={t('E-mail')}
                    startAdornment={
                      <InputAdornment position="start">
                        <CustomImage
                          src="/assets/images/msg_login_sign.png"
                          width={30}
                          height={30}
                          alt={t('Mail icon')}
                        />
                      </InputAdornment>
                    }
                    fullWidth
                    {...formik.getFieldProps('resetEmail')}
                  />
                  <FormErrorMessage
                    touched={formik.touched?.resetEmail}
                    error={formik.errors?.resetEmail}
                  />
                </Box>
                <CustomButton
                  className="modal-btn-losign"
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

export default ForgetPasswordPopup;
