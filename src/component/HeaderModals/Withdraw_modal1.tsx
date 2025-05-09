import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { updateUser } from '@/redux/user/userReducer';
import { Box, InputAdornment } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { CustomButton, CustomMuiOutlinedInput } from '@/component/common';
import CustomImage from '@/component/common/CustomImage';
import FormErrorMessage from '../common/FormErrorMessage';
import CustomMuiSelectDropdown from '@/component/common/mui-component/CustomMuiSelectDropdown';
import { z } from 'zod';
import { validationMsg } from '@/utils/validationMsg';
import { withZodSchema } from 'formik-validator-zod';
import CustomMuiTypography from '../common/mui-component/CustomMuiTypography';
import { useWithdrawRequestMutation } from '@/redux/payment/paymentSlice';
import { handleError } from '@/utils/errorHandler';
import { RTKError } from '@/types/user';
import { checkTenDigitRegex } from '@/utils/regex';

type _props = {
  handleCloseWalletModal: () => void;
};

const Withdraw_modal1: React.FC<_props> = ({ handleCloseWalletModal }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const user = useAppSelector((state) => state.user.user);
  const [withdrawRequest, { isLoading }] = useWithdrawRequestMutation();
  const currencyOptions = [
    { value: 'Trovo', label: t('Trovo') },
    { value: 'trc20', label: t('trc20') },
  ];

  const validationSchema = z.object({
    walletAmount: z
      .number({
        required_error: t(validationMsg.amount.require),
        invalid_type_error: t(validationMsg.amount.require),
      })
      .optional()
      .refine((val) => val !== undefined && val > 0, {
        message: t(validationMsg.amount.require),
      }).refine((val) => {
        if (val === undefined) return true;
        const valString = val.toString();
        return checkTenDigitRegex.test(valString);
      }, {
        message: t(validationMsg.amount.validNumberError),
      }),
    // currency: z.string().nonempty(t(validationMsg.currency.require)),
    currency: z.string().optional(),

    walletAddress: z.string().optional(),
    // .min(12, t(validationMsg.wallet.min))
    // .max(60, t(validationMsg.wallet.max))
    // .nonempty(t(validationMsg.wallet.require)),
  });

  type ValidationSchemaType = z.infer<typeof validationSchema>;

  const formik = useFormik<ValidationSchemaType>({
    initialValues: {
      walletAmount: undefined,
      currency: 'Trovo',
      walletAddress: '',
    },
    validate: withZodSchema(validationSchema),
    onSubmit: async (values) => {
      try {
        const params = {
          // currencyType: values.currency,
          amount: values.walletAmount ? values.walletAmount : 0,
          // walletAddress: values.walletAddress,
        };
        const withdrawRequestRes = await withdrawRequest(params).unwrap();

        if (withdrawRequestRes?.status === 'success') {
          toast.success(withdrawRequestRes?.message);
          const totalBalance = withdrawRequestRes?.data?.totalBalance;
          const withdrawalAvailable =
            withdrawRequestRes.data.withdrawalAvailable;
          if (totalBalance) {
            dispatch(updateUser({ totalBalance: totalBalance }));
          }

          if (withdrawalAvailable) {
            dispatch(updateUser({ withdrawalAvailable: withdrawalAvailable }));
          }
          handleCloseWalletModal();
        } else {
          toast.error(withdrawRequestRes?.message);
        }
      } catch (error: unknown) {
        handleError(error as RTKError);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <div className="withdraw-first">
        <Box className="px-1">
          <CustomMuiTypography
            title={t('Withdraw Amount')}
            className="with-draw-amount-text text-white font-weight-500"
          />
        </Box>
        <div className="mb-2">
          <Box className="fillInThe mb-3">
            <CustomMuiOutlinedInput
              type="number"
              placeholder={`${t('Withdrawal amount')} ${(Number(user?.withdrawalAvailable) || 0).toFixed(2)}`}
              startAdornment={
                <InputAdornment position="start">
                  <CustomImage
                    src="/assets/images/coin.png"
                    alt={t('coin')}
                    width={23}
                    height={23}
                  />
                </InputAdornment>
              }
              fullWidth
              {...formik.getFieldProps('walletAmount')}
            />
          </Box>
          <FormErrorMessage
            error={formik.errors?.walletAmount}
            touched={formik.touched?.walletAmount}
          />
        </div>

        <div className="d-none">
          <Box className="px-1">
            <CustomMuiTypography
              title={t('Choose Currency')}
              className="with-draw-amount-text text-white font-weight-500"
            />
          </Box>
          <Box className="fillInThe mb-3 white-input">
            <CustomMuiSelectDropdown
              value={formik.values.currency}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="currency"
              fullWidth
              className="select-with-text-left"
              options={currencyOptions}
            />
          </Box>
          <Box className="px-1">
            <CustomMuiTypography
              title={t('Wallet Address')}
              className="with-draw-amount-text text-white font-weight-500"
            />
          </Box>
          <div className="mb-2">
            <Box className="fillInThe mb-3">
              <CustomMuiOutlinedInput
                type="text"
                fullWidth
                {...formik.getFieldProps('walletAddress')}
              />
            </Box>
            <FormErrorMessage
              touched={formik.touched?.walletAddress}
              error={formik.errors?.walletAddress}
            />
          </div>
        </div>

        <div className="depositBtn">
          <CustomButton
            isLoading={isLoading}
            type="submit"
            className="modal-btn-withdraw mt-4"
          >
            {t('Withdraw')}
          </CustomButton>
        </div>
      </div>
    </form>
  );
};

export default Withdraw_modal1;
