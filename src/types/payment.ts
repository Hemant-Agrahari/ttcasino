import { apiResponse } from './user';
interface depositPackage {
  _id: string;
  bannerEnglish: string;
  bannerPortuguese: string;
  amount: number;
  bonus: number;
  tag: any;
}
interface depositPackageData {
  promotionId: string;
  depositPackage: depositPackage[];
  promotionPackage: depositPackage[];
}

interface Currency {
  _id: string;
  currency_name: string;
  currency_image: string;
}

//request
export interface depositRequest {
  amount: number;
  // currencyName: string;
  // currency_id: string;
  // promotionId: string;
  packageId: string;
}

export interface withdrawRequest {
  amount: number;
  // currencyType: string;
  // walletAddress: string;
}

//response
export interface createDepositResponse extends apiResponse {}

export interface depositPackageResponse extends apiResponse {
  data: depositPackageData;
}

export interface getCurrencyResponse extends apiResponse {
  data: Currency[];
}

export interface withdrawResponse extends apiResponse {
  data: {
    withdrawalAvailable: number;
    totalBalance: number;
  };
}

export interface currencyRateResponse extends apiResponse {
  data: {
    value: string;
  };
}
