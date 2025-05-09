import React, { useEffect, useState } from 'react';
import { FormControl, Autocomplete, TextField, Paper } from '@mui/material';
import { addDays } from 'date-fns';
import { formatDate, scrollToTop } from '@/utils';
import { useTranslation } from 'react-i18next';
import { CustomButton } from '@/component/common';
import Loader from '@/component/common/mui-component/Loader';
import CustomMuiPagination from '@/component/common/mui-component/CustomMuiPagination';
import CustomDatePicker from '@/component/common/mui-component/CustomDatePicker';
import { gameHistoryResponse } from '@/types/reports';
import {
  useGetPlayedGamesQuery,
  useLazyGetGameHistoryQuery,
} from '@/redux/reports/reportSlice';
import { toast } from 'react-toastify';
import { handleError } from '@/utils/errorHandler';
import { RTKError } from '@/types/user';
import { gmt8Time } from '@/utils/dateUtc';

type gameHistoryData = gameHistoryResponse['data'];
const GameHistory: React.FC = () => {
  const [getGameHistory] = useLazyGetGameHistoryQuery();
  const { data: gameList } = useGetPlayedGamesQuery();
  const [gameTypeSelection, setGameTypeSelection] = useState<string>('');
  const [startDate, setStartDate] = useState(addDays(new Date(), -7));
  const [endDate, setEndDate] = useState(new Date());
  const [gameHistory, setGameHistory] = useState<gameHistoryData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pageSkip, setPageSkip] = useState<number>(0);
  const pageLimit: number = 10;
  const { t } = useTranslation();

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

  const handleGameHistory = async () => {
    setIsLoading(true);
    scrollToTop();
    const param = {
      startDate: handleDateParam(startDate)!,
      endDate: handleDateParam(endDate)!,
      skip: pageSkip,
      limit: pageLimit,
      gameName: gameTypeSelection || '',
    };

    try {
      const res = await getGameHistory(param).unwrap();
      if (res.status === 'success') {
        setGameHistory(res.data);
      } else {
        setGameHistory(null);
        toast.error(res.message);
      }
    } catch (error: unknown) {
      handleError(error as RTKError);
    } finally {
      setIsLoading(false);
    }
  };

  const gameTypeHandle = (event: any, newValue: any) => {
    setGameTypeSelection(newValue);
  };

  const handleDate = (range: [Date, Date]) => {
    const [start, end] = range;
    setStartDate(start);
    setEndDate(end);
  };

  const handleSearch = () => {
    if (pageSkip !== 0) {
      setPageSkip(0);
    } else {
      handleGameHistory();
    }
  };

  useEffect(() => {
    handleGameHistory();
  }, [pageSkip]);

  return (
    <>
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
        <FormControl className="invitationBonus" fullWidth>
          <Autocomplete
            value={gameTypeSelection}
            onChange={gameTypeHandle}
            options={gameList?.data ? gameList?.data : []}
            getOptionLabel={(option) => option}
            noOptionsText={
              <span className="text-white">{t('No Options')}</span>
            }
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={t('Select Option')}
                InputProps={{
                  ...params.InputProps,
                  className: 'custom-autocomplete',
                }}
                className="custom-autocomplete"
              />
            )}
            PaperComponent={({ children }) => (
              <Paper className="custom-autocomplete-dropdown">{children}</Paper>
            )}
          />
        </FormControl>
        <CustomButton
          className="search-btn"
          onClick={handleSearch}
          isLoading={isLoading}
        >
          {t('Search')}
        </CustomButton>
      </div>
      <div className="depositTable game-history-table over-flow-x-auto">
        {isLoading ? (
          <Loader />
        ) : (
          <table className="table table-border">
            <thead>
              <tr className="table-tr">
                <th scope="col">{t('Round Id')}</th>
                <th scope="col">{t('Period')}</th>
                <th scope="col">{t('Game Name')}</th>
                <th scope="col">{t('Bet Amount')}</th>
                <th scope="col">{t('Earnings')}</th>
                <th scope="col">{t('Losses')}</th>
              </tr>
            </thead>
            <tbody>
              {gameHistory?.data && gameHistory?.data?.length > 0 ? (
                gameHistory?.data.map((item) => (
                  <tr className="text-white" key={item?.gameId}>
                    <th scope="row">
                      {item?.gameRoundId ? item?.gameRoundId : '--'}
                    </th>
                    <td>{item.createdAt ? gmt8Time(item?.createdAt) : '--'}</td>
                    <td>{item.gameName ? item?.gameName : '--'}</td>
                    <td>
                      {item?.betAmount ? item?.betAmount?.toFixed(2) : '--'}
                    </td>
                    <td>
                      {item?.winAmount ? item?.winAmount?.toFixed(2) : '--'}
                    </td>
                    <td>
                      {item?.betAmount - item?.winAmount < 0
                        ? '0.00'
                        : (item?.betAmount - item?.winAmount).toFixed(2)}
                    </td>
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
      {gameHistory?.totalCount && gameHistory?.totalCount > 0 ? (
        <div className="depositPagination">
          <CustomMuiPagination
            className="pagination-text"
            pageSkip={pageSkip}
            totalCount={gameHistory?.totalCount}
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

export default GameHistory;
