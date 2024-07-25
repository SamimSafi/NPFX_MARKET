export interface IMainAsset {
  id?: string;
  assetTypeId?: number;
  assetType?: string;
  currencyTypeId?: number;
  currencyType?: string;
  branchId?: number;
  branch?: string;
  depositDate?: string;
  ownerUserName?: string;
  description?: string;
  code?: string;
  ownerUserId?: number;
  balanceAmount?: number;
  afterSubmit?: string;
}

export interface IDepositTo {
  id?: number;
  parentId?: string;
  depositDate?: string;
  toUserName?: string;
  toUserId?: number;
  branchId?: number;
  depositAmmount?: number;
  description?: string;
  afterSubmit?: string;
}

export interface IMainAssetParams {
  pageSize: number;
  pageIndex: number;
  name?: string;
}

export interface IMainAssetTrackingParam {
  mainAssetId?: string;
  pageIndex?: number;
  pageSize?: number;
  userId?: string;
  fromDate?: Date;
  toDate?: Date;
  searchBy?: string;
}
export interface IGetMainAssetTracking {
  currencyTypeId: number;
  currencyType: string;
  userId: string;
  userName: string;
  transactionDate: string;
  debitAmount: number;
  creditAmount: number;
  balanceAmount: number;
  description: string;
  isExpenceTransaction: boolean;
  isTradeTransaction: boolean;
  isLoanTransaction: boolean;
  isWithdrawalTransaction: boolean;
  isPayrollTransaction: boolean;
}

export interface IMainAssetTrackingDetails {
  id?: string;
  currencyTypeId?: number;
  currencyType?: string;
  depositDate?: string;
  description?: string;
  code?: string;
  branchId?: number;
  branch?: string;
  ownerUserId?: string;
  ownerUserName?: string;
  totalDebitAmount?: number;
  totalCreditAmount?: number;
  balanceAmount?: number;
  parentId?: number;
}
