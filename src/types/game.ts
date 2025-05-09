import { apiResponse } from './user';

export interface providerList {
  _id: string;
  providerName: string;
  displayName: string;
  imageUrl: string;
}

export interface gameData {
  _id: string;
  displayName: string;
  providerName: string;
  imageUrl: string;
  customGameId: string;
}

export interface subCategory {
  _id: string;
  name: string;
  image: string;
}

export interface category {
  _id: string;
  subCategory: subCategory[];
  categoryName: string;
  imageUrl: string;
  orderNo: number;
}

// Response
export interface providerResponse extends apiResponse {
  data: {
    providers: providerList[];
    totalCount: number;
  };
}

export interface gameTypeResponse extends apiResponse {
  data: {
    _id: string;
    categoryName: string;
    orderNo: number;
    games: gameData[];
  }[];
}

export interface categoryResponse extends apiResponse {
  data: category[];
}

export interface subCategoryResponse extends apiResponse {
  data: string[];
}

export interface gameUrlResponse extends apiResponse {
  data: string;
}

export interface gameListResponse extends apiResponse {
  data: {
    getgameList: gameData[];
    totalRecords: number;
    totalPage: number;
  };
}
