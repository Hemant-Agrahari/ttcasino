import { apiResponse } from './user';

//request
interface invitationBonusData {
  _id: string;
  usersCount: number;
  rewardAmount: number;
  level: number;
}
export interface levelData {
  _id: string;
  level: number;
  levelProtection: number;
  totalDeposit: number;
  totalBets: number;
  totalWithdraws: number;
  maximumWithdrawPrice: number;
  withdrawFee: number;
  freeWithdraw: number;
  cashbackOriginalGames: number;
  cashbackLiveCasino: number;
  rewardAmount: number;
}

//response
export interface invitationBonusResponse extends apiResponse {
  data: {
    invitationBonusData: invitationBonusData[];
  };
}

export interface levelResponse extends apiResponse {
  data: {
    levelData: levelData[];
  };
}
