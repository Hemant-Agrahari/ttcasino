import { formatDate, scrollToTop } from '@/utils';
import { FormControl } from '@mui/material';
import { addDays } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Loader from '@/component/common/mui-component/Loader';
import CustomMuiPagination from '@/component/common/mui-component/CustomMuiPagination';
import { CustomButton } from '@/component/common';
import CustomDatePicker from '@/component/common/mui-component/CustomDatePicker';
import { bonusHistoryResponse } from '@/types/reports';
import { handleError } from '@/utils/errorHandler';
import { RTKError } from '@/types/user';
import { toast } from 'react-toastify';
import { useLazyGetBonusHistoryQuery } from '@/redux/reports/reportSlice';
import { gmt8Time } from '@/utils/dateUtc';

type bonusHistoryData = bonusHistoryResponse['data'];

const BonusHistory: React.FC = () => {
  const [getBonusHistory] = useLazyGetBonusHistoryQuery();
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState(addDays(new Date(), -7));
  const [endDate, setEndDate] = useState(new Date());
  const [bonusHistory, setBonusHistory] = useState<bonusHistoryData | null>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
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

  const handleStatisticsHistory = async () => {
    setIsLoading(true);
    scrollToTop();
    const param = {
      startDate: handleDateParam(startDate)!,
      endDate: handleDateParam(endDate)!,
      skip: pageSkip,
      limit: pageLimit,
    };

    try {
      const res = await getBonusHistory(param).unwrap();
      if (res.status === 'success') {
        setBonusHistory(res.data);
      } else {
        setBonusHistory(null);
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
      handleStatisticsHistory();
    }
  };

  useEffect(() => {
    handleStatisticsHistory();
  }, [pageSkip]);

  return (
    <>
      <div className="StatisticsTab margin-top-12">
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
            <table className="table table-border text-white table-container">
              <thead>
                <tr>
                  <th scope="col">{t('Bonus')}</th>
                  <th scope="col">{t('User')}</th>
                  <th scope="col">{t('Time')}</th>
                </tr>
              </thead>
              <tbody>
                {bonusHistory?.data && bonusHistory.data.length > 0 ? (
                  bonusHistory.data.map((item, index) => (
                    <tr key={index}>
                      <td>{item?.bonus?.toFixed(2)}</td>
                      <td>{item.nickName}</td>
                      <td>
                        <span className="font-weight-400 mr-3">
                          {gmt8Time(item?.date)}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="fw-bold fs-4" colSpan={3}>
                      {t('Data Not Found')}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {bonusHistory?.totalCount && bonusHistory?.totalCount > 0 ? (
        <div className="depositPagination">
          <CustomMuiPagination
            className="pagination-text"
            pageSkip={pageSkip}
            totalCount={bonusHistory?.totalCount}
            pageLimit={pageLimit}
            onChange={(e, v: number) => {
              setPageSkip((v - 1) * pageLimit);
            }}
          />
        </div>
      ) : null}
    </>
  );
};

export default BonusHistory;
