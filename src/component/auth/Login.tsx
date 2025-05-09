import { useState } from 'react';
import { IconButton, Box, InputAdornment, Dialog } from '@mui/material';
import { VisibilityOff, Visibility, Email, Https } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useFormik } from 'formik';
import SignIn from './Signup';
import { toast } from 'react-toastify';
import { setUser } from '@/redux/user/userReducer';
import { useRouter } from 'next/router';
import { CustomButton, CustomMuiOutlinedInput } from '@/component/common';
import ForgetPasswordPopup from './ForgotPassword';
import { checkEmail, getDeviceToken, getDeviceTokenSignup } from '@/utils';
import { useTranslation } from 'react-i18next';
import FormErrorMessage from '@/component/common/FormErrorMessage';
import { withZodSchema } from 'formik-validator-zod';
import { z } from 'zod';
import { validationMsg } from '@/utils/validationMsg';
import CustomMuiTab from '../common/mui-component/CustomMuiTab';
import CustomMuiTypography from '../common/mui-component/CustomMuiTypography';
import { useSignInMutation } from '@/redux/user/userSlice';
import { handleError } from '@/utils/errorHandler';
import { RTKError } from '@/types/user';

type _props = {
  handleCloseLoginModal: (redirection?: boolean) => void;
  tabIndex: number;
  setTabIndex: (index: number) => void;
};

const Login: React.FC<_props> = ({
  handleCloseLoginModal,
  tabIndex,
  setTabIndex,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [openForgetPasswordModal, setOpenForgetPasswordModal] =
    useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const previousRoute = useAppSelector((state) => state.models.previousRoute);
  const [signInService, { isLoading }] = useSignInMutation();
  const handleCloseForgetPassword = () => setOpenForgetPasswordModal(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleForgetPassword = () => {
    setOpenForgetPasswordModal(true);
  };

  const handleTabChange = (
    event: React.SyntheticEvent,
    newTabIndex: number,
  ) => {
    setTabIndex(newTabIndex);
  };

  const handleMouseDownPassword = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  const validationSchema = z.object({
    email: z
      .string()
      .nonempty(t(validationMsg.email.require))
      .email(`${t(validationMsg.email.invalidEmail)}`),
    password: z.string().nonempty(t(validationMsg.password.require)),
  });

  type ValidationSchemaType = z.infer<typeof validationSchema>;

  const formik = useFormik<ValidationSchemaType>({
    initialValues: {
      email: '',
      password: '',
    },

    validate: withZodSchema(validationSchema),
    onSubmit: async (values) => {
      const checkedEmail = checkEmail(values.email);
      try {
        const obj = {
          email: values.email,
          password: values.password,
          deviceToken: checkedEmail ? getDeviceToken() : getDeviceTokenSignup(),
        };

        const res = await signInService(obj).unwrap();
        if (res.status === 'success') {
          dispatch(setUser(res.data));
          toast.success(res?.message);
          handleCloseLoginModal(true);
          formik.resetForm();
          router.push(previousRoute);
        } else {
          toast.error(res?.message);
        }
      } catch (error: unknown) {
        handleError(error as RTKError);
      }
    },
  });

  return (
    <div
      className={`modal-content ${openForgetPasswordModal ? 'd-none' : ''} `}
    >
      <div className="modal_closebtn">
        <CustomButton
          type="button"
          className="close_form_btn"
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          <CloseIcon
            className="text-white"
            onClick={() => handleCloseLoginModal()}
          />
        </CustomButton>
      </div>
      <div className="modal-body">
        <Box className="TabLogin_Signup">
          <CustomMuiTab
            tabClassName="login-tab"
            tabsClassName="login-tabs"
            value={tabIndex}
            onChange={handleTabChange}
            tabLabels={[t('Log in'), t('Sign up')]}
            disableRipple={true}
          />
        </Box>
        <Box>
          {tabIndex === 0 && (
            <form
              className="modal_form_signIn mt-xxl-5 mt-lg-5 mt-3"
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <div className="mb-2">
                <Box>
                  <CustomMuiOutlinedInput
                    placeholder={t('E-mail')}
                    type="email"
                    startAdornment={
                      <InputAdornment position="start">
                        <Email className="text-white" />
                      </InputAdornment>
                    }
                    fullWidth
                    {...formik.getFieldProps('email')}
                  />
                  <FormErrorMessage
                    error={formik.errors.email}
                    touched={formik.touched.email}
                  />
                </Box>
                <Box>
                  <CustomMuiOutlinedInput
                    className="mt-4"
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder={t('Password')}
                    startAdornment={
                      <InputAdornment position="start">
                        <Https className="text-white" />
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="start">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
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
                    fullWidth
                    {...formik.getFieldProps('password')}
                  />
                  <FormErrorMessage
                    error={formik.errors.password}
                    touched={formik.touched.password}
                  />
                </Box>
                <Box className="d-flex align-items-center justify-content-end">
                  <CustomMuiTypography
                    title={`${t('Forgot Password')}?`}
                    className="font-weight-600 mt-3 cursor-pointer login-forgot-text"
                    onClick={() => {
                      handleForgetPassword();
                    }}
                  />
                </Box>
                <CustomButton
                  type="submit"
                  className="modal-btn-losign mt-3"
                  isLoading={isLoading}
                >
                  {t('Log in')}
                </CustomButton>
                <h6 className="mt-3">
                  <span className="f-16 login-age-verify-text">
                    {t(
                      'To visit this site, please ensure that you are over 18 and agree to the',
                    )}
                    &nbsp;
                  </span>
                  <span
                    className="f-15 text-white cursor-pointer"
                    onClick={() => {
                      handleCloseLoginModal();
                      router.push('/privacy-policy?tab=0');
                    }}
                  >
                    <u>{t('Terms & Conditions')}</u>
                  </span>
                </h6>
              </div>
            </form>
          )}
          {tabIndex === 1 && (
            <SignIn handleCloseLoginModal={handleCloseLoginModal} />
          )}
        </Box>
        <Dialog
          className="signUpModaluniversal"
          open={openForgetPasswordModal}
          onClose={setOpenForgetPasswordModal}
          scroll="body"
        >
          <ForgetPasswordPopup
            handleCloseForgetPassword={handleCloseForgetPassword}
          />
        </Dialog>
      </div>
    </div>
  );
};
export default Login;
