import { useEffect, useState } from 'react';
import { FormControl } from '@mui/material';
import { addDays } from 'date-fns';
import { formatDate, scrollToTop } from '@/utils';
import { useTranslation } from 'react-i18next';
import Loader from '@/component/common/mui-component/Loader';
import CustomMuiPagination from '@/component/common/mui-component/CustomMuiPagination';
import { CustomButton } from '@/component/common';
import CustomDatePicker from '@/component/common/mui-component/CustomDatePicker';
import { useLazyGetDepositHistoryQuery } from '@/redux/reports/reportSlice';
import { toast } from 'react-toastify';
import { handleError } from '@/utils/errorHandler';
import { RTKError } from '@/types/user';
import { depositHistoryResponse } from '@/types/reports';
import { gmt8Time } from '@/utils/dateUtc';

type depositHistoryData = depositHistoryResponse['data'];

const DepositTab: React.FC = () => {
  const [getDepositHistory] = useLazyGetDepositHistoryQuery();
  const [startDate, setStartDate] = useState(addDays(new Date(), -7));
  const [endDate, setEndDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [depositReport, setDepositReport] =
    useState<depositHistoryData | null>();
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
    const params = {
      startDate: handleDateParam(startDate)!,
      endDate: handleDateParam(endDate)!,
      skip: pageSkip,
      limit: pageLimit,
    };

    try {
      const res = await getDepositHistory(params).unwrap();
      if (res.status === 'success') {
        setDepositReport(res.data);
      } else {
        setDepositReport(null);
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
      <div className="depositTable over-flow-x-auto">
        {isLoading ? (
          <Loader />
        ) : (
          <table className="table table-border">
            <thead>
              <tr className="table-tr">
                <th scope="col">{t('Transaction Id')}</th>
                <th scope="col">{t('Date')}</th>
                <th scope="col">{t('Deposit Amount')}</th>
                <th scope="col">{t('Status')}</th>
              </tr>
            </thead>
            <tbody>
              {depositReport?.data && depositReport?.data?.length > 0 ? (
                depositReport?.data.map((data) => (
                  <tr key={data._id} className="text-white">
                    <td>{data.transactionId ? data?.transactionId : '--'}</td>
                    <td>
                      {data?.createdAt ? gmt8Time(data?.createdAt) : '--'}
                    </td>
                    <td>{data?.amount ? data?.amount : '--'}</td>
                    <td>{data?.status ? data?.status : '--'}</td>
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
      {depositReport?.totalCount && depositReport?.totalCount > 0 ? (
        <div className="depositPagination">
          <CustomMuiPagination
            className="pagination-text"
            pageSkip={pageSkip}
            totalCount={depositReport?.totalCount}
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

export default DepositTab;
