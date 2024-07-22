export interface IWithdrawalTracking {
  id?: number;
  currencyTypeId?: number;
  currencyName?: string;
  mainAssetId?: number;
  asset?: string;
  date?: string;
  description?: string;
  userId?: number;
  user?: string;
  withdrawalAmount?: number;
  dueDate?: string;
  afterSubmit?: string;
}

export interface IWithdrawalTrackingParams {
  pageIndex: number;
  pageSize: number;
  name?: string;
}
