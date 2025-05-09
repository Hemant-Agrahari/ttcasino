export interface apiResponse {
  message: string;
  statusCode: number;
  status: string;
}

export type RTKError = {
  status: number;
  data: {
    status: string;
    statusCode: number;
    message: string;
  };
};

export interface userType {
  _id: string;
  userName: string;
  nickName: string;
  avatar: string;
  email: string;
  token: string;
  level: number;
  playerId: string;
  origanlCashBack: number | null;
  liveCasino: number;
  totalBalance: number;
  pendingNotification: boolean;
  isDailySpin: boolean;
  withdrawalAvailable: number;
  totalRedeemed: number;
  vipLevelDetails: {
    betPer: number;
    currenDeposit: number;
    currenLevel: number;
    currentBet: number;
    depositPer: number;
    nextLevel: number;
    nextLevelBet: number;
    nextLevelDeposit: number;
  };
}

// Request
export interface loginRequest {
  email: string;
  password: string;
}

export interface signUpRequest {
  userName: string;
  email: string;
  password: string;
  referralCode: string;
  isAcceptTNC: boolean;
  deviceToken: string;
}

export interface resetPasswordRequest {
  password: string;
  confirmPassword: string;
}

export interface forgetPasswordRequest {
  email: string;
}

export interface signUpResponse extends apiResponse {
  data: userType;
}

export interface forgetPasswordResponse extends apiResponse {}

export interface logoutResponse extends apiResponse {}

export interface logoutResponse extends apiResponse {}

export interface resetPasswordResponse extends apiResponse {}
