export interface ILoanTracking {
  id?: number;
  partnerId?: number;
  branchId?: number;
  partner?: string;
  nameInEnglish?: string;
  nameInPashto?: string;
  phone?: string;
  email?: string;
  loanTypeId?: number;
  loanTypeName?: string;
  partnerPhone?: string;
  loanAmount?: number;
  paidAmount?: number;
  remainAmount?: number;
  currencyTypeId?: number;
  currencyType?: string;
  mainAssetId?: string;
  asset?: string;
  date?: string;
  dueDate?: string;
  description?: string;
  userId?: string;
  userName?: string;
  status?: string;
  isGiven?: boolean;
  afterSubmit?: string;
}

export interface ILoanTrackingParams {
  pageIndex: number;
  pageSize: number;
  name?: string;
  mainAssetId?: string;
  isGiven?: boolean;
}

export interface IPayTakenLoan {
  loanTrackingId?: number;
  mainAssetId?: string;
  exchangeRate: number;
  amountByMainAssetCurrencyType: number;
  amountByLoanTrackingCurrencyType: number;
  afn?: number;
  usd?: number;
  currencyTypeId?: number;
  date: string;
  description: string;
  afterSubmit?: string;
}

export interface IRecieveGivenLoan {
  loanTrackingId?: number;
  currencyTypeId?: number;
  amountBySelectedCurrencyType: number;
  exchangeRate: number;
  amountByLoanTrackingCurrencyType: number;
  afn?: number;
  usd?: number;
  date?: string;
  description?: string;
  afterSubmit?: string;
}

export interface ILoanDetails {
  id: number;
  currencyTypeId: number;
  currencyType: string;
  date: string;
  dueDate: string;
  description: string;
  partnerId: number;
  partner: string;
  partnerPhone: string;
  userId: string;
  userName: string;
  loanAmount: number;
  paidAmount: number;
  remainAmount: number;
  mainAssetId: string;
  mainAssetUserName: string;
  createdByUserName: string;
  createdOn: string;
  modifiedOn: string;
}
