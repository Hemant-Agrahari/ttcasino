import { apiResponse } from './user';

export interface bannerList {
  _id: string;
  image: string;
  bannerValue: null;
}

export interface promotionBanner {
  _id: string;
  banner: string;
}

export interface promotionData {
  static: promotionBanner[];
  daily: promotionBanner[];
}

export interface promotionById {
  _id: string;
  description: string;
  banner: string;
  name: string;
  depositAmount: string;
  maximumBonus: string;
  bonusPercentage: string;
  withdrawCondition: string;
}
export interface cmsContent {
  _id: string;
  type: string;
  title: string;
  content: string;
  image:string;
}

// Request
export interface sendMessageRequest {
  email: string;
  mobileNumber: string;
  name: string;
  message: string;
}

export interface faqList {
  question: string;
  answer: string;
}
// Response
export interface bannerResponse extends apiResponse {
  data: bannerList[];
}

export interface cmsResponse extends apiResponse {
  data: cmsContent;
}

export interface faqResponse extends apiResponse {
  data: faqList[];
}

export interface promotionResponse extends apiResponse {
  data: promotionData[];
}

export interface promotionByIdResponse extends apiResponse {
  data: promotionById;
}

export interface sendMessageResponse extends apiResponse {}
