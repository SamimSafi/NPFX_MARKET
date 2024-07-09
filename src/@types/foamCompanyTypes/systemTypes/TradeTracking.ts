export interface ITradeTracking {
  id?: number;
  currencyTypeId?: number;
  currencyName?: string;
  assetTypeId?: number;
  assetType?: string;
  transactionDate?: string;
  description?: string;
  userId?: number;
  user?: string;
  tradeAmount?: number;
  profitAmount?: number;
  lossAmount?: number;
  afterSubmit?: string;
}

export interface ITradeTrackingParams {
  pageIndex: number;
  pageSize: number;
  name?: string;
}
