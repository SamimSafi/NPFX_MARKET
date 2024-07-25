export interface ILoanTracking {
  id?: number;
  partnerId?: number;
  branchId?: number;
  partner?: string;
  nameInEnglish?: string;
  nameInPashto?: string;
  phone?: string;
  partnerPhone?: string;
  email?: string;
  loanTypeId?: number;
  loanAmount?: number;
  paidAmount?: number;
  remainAmount?: number;
  loanTypeName?: string;
  currencyTypeId?: number;
  currencyType?: string;
  mainAssetId?: string;
  asset?: string;
  date?: string;
  dueDate?: string;
  description?: string;
  userId?: string;
  userName?: string;
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
}
