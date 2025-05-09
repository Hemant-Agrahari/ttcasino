import React, { useEffect } from 'react';
import { Box, DialogTitle, IconButton, InputAdornment } from '@mui/material';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';
import { CustomButton } from '../common';
import { useAppSelector } from '@/redux/hooks';
import { useTranslation } from 'react-i18next';
import { CustomMuiOutlinedInput } from '@/component/common';
import CustomImage from '@/component/common/CustomImage';
import { useBecomeAffiliateMutation } from '@/redux/player/playerSlice';
import { handleError } from '@/utils/errorHandler';
import { RTKError } from '@/types/user';
import { validationMsg } from '@/utils/validationMsg';
import { z } from 'zod';
import { withZodSchema } from 'formik-validator-zod';
import FormErrorMessage from '../common/FormErrorMessage';
interface _props {
  handleCloseAffiliate: () => void;
}

const AffiliateModal: React.FC<_props> = ({ handleCloseAffiliate }) => {
  const user = useAppSelector((state) => state.user.user);
  const { t } = useTranslation();
  const [becomeAffiliateService, { isLoading }] = useBecomeAffiliateMutation();

  const validationSchema = z.object({
    email: z.string(),
    description: z
      .string()
      .nonempty(t(validationMsg.description.require))
  });
  type ValidationSchemaType = z.infer<typeof validationSchema>;
  const formik = useFormik<ValidationSchemaType>({
    initialValues: {
      email: user?.email || '',
      description: '',
    },
    validate: withZodSchema(validationSchema),
    onSubmit: async (values) => {
      try {
        const response = await becomeAffiliateService(values).unwrap();
        if (response.status === 'success') {
          toast.success(t(response?.message));
          handleCloseAffiliate();
        } else {
          toast.error(response.message);
        }
      } catch (error: unknown) {
        handleError(error as RTKError);
      }
    },
  });

  useEffect(() => {
    return () => {
      if (handleCloseAffiliate) handleCloseAffiliate();
    };
  }, [handleCloseAffiliate]);

  return (
    <>
      <div className="affiliate-modal-dialog-text">
        <DialogTitle className="text-white text-center title">
          {t('Become an Affiliate')}
        </DialogTitle>
        <IconButton
          className="close_form_btn m-1 close-icon"
          aria-label="Close"
          onClick={handleCloseAffiliate}
        >
          <CloseIcon className="font-size-32 text-white" />
        </IconButton>
      </div>

      <div className="modal-content">
        <div className="modal-body affiliate-modal-container">
          <div className="modal_form_signIn">
            <Box>
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                  <CustomMuiOutlinedInput
                    className="form-field custom-input"
                    fullWidth
                    readOnly
                    type="email"
                    placeholder={t('Email Address')}
                    value={formik.values.email}
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
                  />
                </div>
                <div className="mb-3">
                  <CustomMuiOutlinedInput
                    type="text"
                    className="form-field custom-input"
                    fullWidth
                    multiline
                    rows={3}
                    placeholder={t('Description')}
                    {...formik.getFieldProps('description')}
                  />
                  <FormErrorMessage
                    error={formik.errors.description}
                    touched={formik.touched.description}
                  />
                </div>
                <div className="d-flex justify-content-center gap-3">
                  <CustomButton
                    type="submit"
                    className="modal-btn-losign mt-3"
                    isLoading={isLoading}
                  >
                    {t('Submit')}
                  </CustomButton>
                  <CustomButton
                    onClick={handleCloseAffiliate}
                    type="button"
                    className="modal-btn-losign mt-3"
                  >
                    {t('Cancel')}
                  </CustomButton>
                </div>
              </form>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default AffiliateModal;
