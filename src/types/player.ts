import { apiResponse } from './user';
export interface referralData {
  depositedUser: number;
  guestUser: number;
  inviteCode: string;
  inviteUrl: string;
  todayBonus: number;
  yesterdayBonus: number;
}
interface notification {
  _id: string;
  title: string;
  content: string;
  read: boolean;
  createdAt: string;
}

// Request
export interface avatarUpdateRequest {
  avatar: string;
}

export interface updateNotificationRequest {
  notificationId?: string;
  type: 'single' | 'many';
}

export interface becomeAffiliateRequest {
  email: string;
  description: string;
}

// response
export interface avatarUpdateResponse extends apiResponse {}

export interface referralLinkResponse extends apiResponse {
  data: referralData;
}

export interface notificationResponse extends apiResponse {
  data: notification[];
}

export interface becomeAffiliateResponse extends apiResponse {}

export interface updateNotificationResponse extends apiResponse {
  status: string;
  type: 'single' | 'many';
}
