export interface ITradeTracking {
  id?: number;
  currencyTypeId?: number;
  currencyType?: string;
  date?: string;
  mainAssetId?: string;
  assetType?: string;
  description?: string;
  branchId?: number;
  branch?: string;
  userId?: number;
  userName?: string;
  tradeAmount?: number;
  profitAmount?: number;
  lossAmount?: number;
  afterSubmit?: string;
}

export interface ITradeTrackingParams {
  pageIndex: number;
  pageSize: number;

  searchBy?: string;

  mainAssetId?: string;
}
