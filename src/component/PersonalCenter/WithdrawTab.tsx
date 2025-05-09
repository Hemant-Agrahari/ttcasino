import { useState, useEffect } from 'react';
import { FormControl } from '@mui/material';
import { addDays } from 'date-fns';
import { formatDate, scrollToTop } from '@/utils';
import { useTranslation } from 'react-i18next';
import Loader from '@/component/common/mui-component/Loader';
import CustomMuiPagination from '@/component/common/mui-component/CustomMuiPagination';
import { CustomButton } from '@/component/common';
import CustomDatePicker from '@/component/common/mui-component/CustomDatePicker';
import { useLazyGetWithdrawHistoryQuery } from '@/redux/reports/reportSlice';
import { handleError } from '@/utils/errorHandler';
import { RTKError } from '@/types/user';
import { toast } from 'react-toastify';
import { withdrawHistoryResponse } from '@/types/reports';
import { gmt8Time } from '@/utils/dateUtc';

type withdrawHistoryData = withdrawHistoryResponse['data'];

const WithdrawTab: React.FC = () => {
  const [getWithdrawHistory] = useLazyGetWithdrawHistoryQuery();
  const [startDate, setStartDate] = useState(addDays(new Date(), -7));
  const [endDate, setEndDate] = useState(new Date());
  const [walletHistory, setWalletHistory] =
    useState<withdrawHistoryData | null>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { t } = useTranslation();
  const [pageSkip, setPageSkip] = useState<number>(0);
  const pageLimit: number = 10;

  const handleDate = (range: [Date, Date]) => {
    const [startDate, endDate] = range;
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const handleDateParam = (date: Date) => {
    if (date) {
      return formatDate(
        date?.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
      );
    } else {
      setEndDate(startDate);
      return formatDate(
        startDate?.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
      );
    }
  };

  const handleWalletHistory = async () => {
    setIsLoading(true);
    scrollToTop();
    const param = {
      startDate: handleDateParam(startDate)!,
      endDate: handleDateParam(endDate)!,
      skip: pageSkip,
      limit: pageLimit,
    };

    try {
      const res = await getWithdrawHistory(param).unwrap();
      if (res.status === 'success') {
        setWalletHistory(res.data);
      } else {
        setWalletHistory(null);
        toast.error(res.message);
      }
    } catch (error: unknown) {
      handleError(error as RTKError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    if (pageSkip !== 0) {
      setPageSkip(0);
    } else {
      handleWalletHistory();
    }
  };

  useEffect(() => {
    handleWalletHistory();
  }, [pageSkip]);

  return (
    <div>
      <div className="bonus-date">
        <FormControl className="statistics-startEndDate">
          <CustomDatePicker
            selected={startDate}
            onChange={handleDate}
            startDate={startDate}
            endDate={endDate}
            maxDate={new Date()}
            placeholderText={t('"Start - End Date"')}
          />
        </FormControl>
        <CustomButton
          isLoading={isLoading}
          className="search-btn"
          onClick={handleSearch}
        >
          {t('Search')}
        </CustomButton>
      </div>
      <div className="depositTable deposit-table-content">
        {isLoading ? (
          <Loader />
        ) : (
          <table className="table table-border">
            <thead>
              <tr className="table-tr">
                <th scope="col">{t('Transaction Id')}</th>
                <th scope="col">{t('Date')}</th>
                <th scope="col">{t('Withdrawal Value')}</th>
                <th scope="col">{t('Status')}</th>
              </tr>
            </thead>
            <tbody>
              {walletHistory?.data && walletHistory?.data?.length > 0 ? (
                walletHistory?.data?.map((data) => (
                  <tr key={data._id} className="text-white">
                    <td>{data.transactionId ? data?.transactionId : '--'}</td>
                    <td>
                      {data?.createdAt ? gmt8Time(data?.createdAt) : '--'}
                    </td>
                    <td>{data.amount ? data.amount : '--'}</td>
                    <td>{data.status ? data.status : '--'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="fw-bold fs-4 text-center mt-2" colSpan={6}>
                    {t('Data Not Found')}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
      {walletHistory?.totalCount && walletHistory?.totalCount > 0 ? (
        <div className="depositPagination">
          <CustomMuiPagination
            className="pagination-text"
            pageSkip={pageSkip}
            totalCount={walletHistory?.totalCount}
            pageLimit={pageLimit}
            onChange={(e, v: number) => {
              setPageSkip((v - 1) * pageLimit);
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

export default WithdrawTab;
