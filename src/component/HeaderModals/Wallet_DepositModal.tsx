import { Box, InputAdornment, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { removeExtraSymbols } from '@/utils';
import { useFormik } from 'formik';
import { z } from 'zod';
import { withZodSchema } from 'formik-validator-zod';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { CustomButton, CustomMuiOutlinedInput } from '@/component/common';
import { validationMsg } from '@/utils/validationMsg';
import FormErrorMessage from '@/component/common/FormErrorMessage';
import CustomMuiCheckbox from '@/component/common/mui-component/CustomMuiCheckbox';
import CustomMuiTypography from '../common/mui-component/CustomMuiTypography';
import {
  useCreateDepositMutation,
  useGetCurrencyQuery,
  useGetDepositPackageQuery,
  useLazyGetRatesQuery,
} from '@/redux/payment/paymentSlice';
import { handleError } from '@/utils/errorHandler';
import { RTKError } from '@/types/user';
import { toast } from 'react-toastify';
import { checkTenDigitRegex } from '@/utils/regex';

interface _props {
  handleCloseWalletModal: () => void;
}

const Wallet_DepositModal: React.FC<_props> = ({ handleCloseWalletModal }) => {
  const { t } = useTranslation();
  const [promotionCheck, setPromotionCheck] = useState<boolean>(false); // State to track deposit amount
  const [selectedCurrency, setSelectedCurrency] = useState<string>('');
  const [currencyRate, setCurrencyRate] = useState<string>('');
  const { data: currency } = useGetCurrencyQuery();
  const { data: depositPackageData, refetch } = useGetDepositPackageQuery();
  const [createDeposit, { isLoading }] = useCreateDepositMutation();
  const [getRateData] = useLazyGetRatesQuery();

  const validationSchema = z.object({
    package: z
      .number({
        required_error: t(validationMsg.packages.require),
        invalid_type_error: t(validationMsg.packages.require),
      })
      .optional()
      .refine((val) => val !== undefined && val > 0, {
        message: t(validationMsg.packages.require),
      }).refine((val) => {
        if (val === undefined) return true;
        const valString = val.toString();
        return checkTenDigitRegex.test(valString);
      }, {
        message: t(validationMsg.packages.validNumberError),
      }),
    // currency: z.string().nonempty(t(validationMsg.currency.require)),
    currency: z.string().optional(),
    currencySelect: z.string().optional(),
  });

  type ValidationSchemaType = z.infer<typeof validationSchema>;

  const formik = useFormik<ValidationSchemaType>({
    initialValues: {
      package: undefined,
      currency: '',
      currencySelect: 'default',
    },
    validate: withZodSchema(validationSchema),
    onSubmit: async (values) => {
      const promotionId = depositPackageData?.data.promotionPackage.find(
        (item) => item.amount === values.package,
      );
      const packageId = depositPackageData?.data.depositPackage.find(
        (item) => item.amount === values.package,
      );

      // const currency_id = currency?.data.find(
      //   (item) => item.currency_name === values.currencySelect,
      // );

      try {
        const payload = {
          promotionId: promotionId?._id ? promotionId?._id : '',
          packageId: packageId?._id ? packageId?._id : '',
          amount: values.package ? values.package : 0,
          // currency_id: currency_id?._id ? currency_id._id : '',
          // currencyName: values.currencySelect,
        };

        const result = await createDeposit(payload).unwrap();

        if (result.status === 'success') {
          toast.success(result.message);
          handleCloseWalletModal();
        } else {
          toast.error(result.message);
        }
      } catch (error: unknown) {
        handleError(error as RTKError);
      }
    },
  });

  const handleDepositSelection = (amount: number) => {
    formik.setFieldValue('package', amount);
  };

  const fetchCurrencyRate = async () => {
    try {
      const result = await getRateData({
        currency_name: selectedCurrency,
      }).unwrap();

      if (result.status === 'success') {
        setCurrencyRate(result.data.value);
      } else {
        toast.error(result.message);
      }
    } catch (error: unknown) {
      handleError(error as RTKError);
    }
  };

  useEffect(() => {
    if (selectedCurrency) {
      fetchCurrencyRate();
    }
  }, [selectedCurrency]);

  useEffect(() => {
    if (selectedCurrency && currencyRate && formik.values.package) {
      formik.setFieldValue(
        'currency',
        String(Number(currencyRate) * Number(formik.values.package)),
      );
    }
  }, [formik.values.package, currencyRate]);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <form className="modal_form_signIn" onSubmit={formik.handleSubmit} noValidate>
      <div>
        <Box>
          <CustomMuiTypography
            color="white"
            className="with-draw-amount-text mb-2 text-white font-weight-500"
            title={t('Deposit Amount')}
          />
        </Box>
        <Box>
          <CustomMuiOutlinedInput
            className="wallet-outlined-input"
            type="number"
            id="outlined-adornment-password"
            startAdornment={
              <InputAdornment position="start">
                <p className="text-white fs-5 mt-3"> $</p>
              </InputAdornment>
            }
            fullWidth
            {...formik.getFieldProps('package')}
          />

          <FormErrorMessage
            error={formik.errors.package}
            touched={formik.touched.package}
          />
        </Box>

        {/* Deposit Packages */}
        <Box>
          <CustomMuiTypography
            color="white"
            className="with-draw-amount-text mt-3 text-white font-weight-500"
            title={t('Deposit Packages')}
          />
        </Box>

        <div className="deposit-bonus">
          {/* Map through deposit packages and render links */}
          {depositPackageData &&
          depositPackageData?.data.depositPackage?.length > 0
            ? depositPackageData?.data.depositPackage.map((item) => (
                <div
                  className="wallet_sec_other"
                  onClick={() => {
                    handleDepositSelection(item?.amount);
                  }}
                  key={item?._id}
                >
                  <div className="depo-amount cursor-pointer">
                    <span> $</span>
                    {item?.amount}
                  </div>
                  {
                    <div className="bonus-percentage">
                      +{item?.bonus}% {t('Bonus')}
                    </div>
                  }
                  <div className="hot">{item?.tag}</div>
                </div>
              ))
            : null}
        </div>

        {/* Promotion package */}
        {!promotionCheck &&
        depositPackageData &&
        depositPackageData?.data.promotionPackage.length > 0 ? (
          <>
            <Box>
              <CustomMuiTypography
                color="white"
                className="with-draw-amount-text mt-3 text-white font-weight-500"
                title={t('Promotion Packages')}
              />
            </Box>

            <div className="deposit-bonus">
              {depositPackageData?.data.promotionPackage?.map((item) => (
                <div
                  className="wallet_sec_other"
                  onClick={() => {
                    handleDepositSelection(item?.amount);
                  }}
                  key={item?._id}
                >
                  <div className="depo-amount cursor-pointer">
                    <span> $</span>
                    {item?.amount}
                  </div>
                  {!promotionCheck && (
                    <div className="bonus-percentage">
                      +{item?.bonus}% {t('Bonus')}
                    </div>
                  )}
                  <div className="hot">{item?.tag}</div>
                </div>
              ))}
            </div>
          </>
        ) : null}

        <div className="d-none">
          <Box className="mt-3 white-input">
            <Select
              className="select-currency-wallet-dropdown"
              fullWidth
              startAdornment={
                <InputAdornment position="start">
                  <p className="text-white fs-5 mt-3">$</p>
                </InputAdornment>
              }
              value={selectedCurrency || 'default'}
              onChange={(event) => {
                const currencyName = event.target.value;
                setSelectedCurrency(currencyName);
                formik.setFieldValue('currencySelect', currencyName);
              }}
            >
              <MenuItem value="default" disabled>
                {t('Select currency')}
              </MenuItem>
              {currency && currency?.data?.length > 0 ? (
                currency.data.map((coin: any, index: number) => (
                  <MenuItem value={coin.currency_name} key={index}>
                    {removeExtraSymbols(coin.currency_name)}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="default">
                  {t('No currencies available')}
                </MenuItem>
              )}
            </Select>
          </Box>

          <Box>
            <CustomMuiOutlinedInput
              className="mt-4"
              type="text"
              id="input-with-icon-textfield"
              placeholder={t('Coin')}
              fullWidth
              readOnly
              startAdornment={
                <InputAdornment position="start">
                  <CurrencyExchangeIcon />
                </InputAdornment>
              }
              {...formik.getFieldProps('currency')}
            />
            <FormErrorMessage
              error={formik.errors.currency}
              touched={formik.touched.currency}
            />
          </Box>

          {depositPackageData &&
          depositPackageData?.data.promotionPackage.length > 0 ? (
            <div className="doNot_div mt-4">
              <span>
                <CustomMuiCheckbox
                  className="wallet-participate-checkbox"
                  checked={promotionCheck}
                  onChange={() => setPromotionCheck(!promotionCheck)}
                />
              </span>

              <span className="doNotText">
                {t('Do not participate in promotions')}
              </span>
            </div>
          ) : (
            ''
          )}
        </div>
        <div className="depositBtn">
          <CustomButton
            className="modal-btn-CPF mt-3 fw-semibold"
            type="submit"
            isLoading={isLoading}
          >
            {t('Deposit')}
          </CustomButton>
        </div>
      </div>
    </form>
  );
};

export default Wallet_DepositModal;
