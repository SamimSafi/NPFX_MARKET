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
  currencyTypeId?: number;
  currencyType?: string;
  mainAssetId?: string;
  asset?: string;
  loanAmount?: number;
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
}

export interface IPayTakenLoan {
  loanTrackingId?: number;
  mainAssetId?: string;
  amountByMainAssetCurrencyType: number;
  loanCurrencyToSelectedCurrencyExchangeRate: number;
  selectedCurrencyToLoanCurrencyExchangeRate: number;
  amountByLoanTrackingCurrencyType: number;
  date: string;
  description: string;
  userId: string;
}
