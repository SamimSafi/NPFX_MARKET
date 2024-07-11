export interface ILoanTracking {
  id?: number;
  currencyTypeId?: number;
  currencyName?: string;
  partnerId?: number;
  partnerName?: string;
  loanTypeId?: number;
  loanTypeName?: string;
  assetId?: number;
  asset?: string;
  loanAmount?: number;
  date?: string;
  description?: string;
  userId?: number;
  user?: string;
  afterSubmit?: string;
}

export interface ILoanTrackingParams {
  pageIndex: number;
  pageSize: number;
  name?: string;
}
