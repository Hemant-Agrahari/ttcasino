import { apiResponse } from './user';

export interface queryParam {
  startDate: string;
  endDate: string;
  skip: number;
  limit: number;
}

interface InvitationBonusType {
  bonus: number;
  nickName: string;
  date: string;
}

export interface GameHistoryType {
  gameId: string;
  betAmount: number;
  winAmount: number;
  createdAt: string;
  gameRoundId: string;
  gameName: string;
}

export interface DepositDataType {
  _id: string;
  amount: number;
  status: string;
  transactionId: string;
  createdAt: string;
}

// Response
export interface userPlayedGameResponse extends apiResponse {
  data: string[];
}

export interface bonusHistoryResponse extends apiResponse {
  data: {
    pages: number;
    totalCount: number;
    data: InvitationBonusType[];
  };
}

export interface gameHistoryResponse extends apiResponse {
  data: {
    pages: number;
    totalCount: number;
    data: GameHistoryType[];
  };
}

export interface depositHistoryResponse extends apiResponse {
  data: {
    pages: number;
    totalCount: number;
    data: DepositDataType[];
  };
}

export interface withdrawHistoryResponse extends apiResponse {
  data: {
    pages: number;
    totalCount: number;
    data: DepositDataType[];
  };
}
