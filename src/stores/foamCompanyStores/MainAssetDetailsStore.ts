import { makeAutoObservable, runInAction } from 'mobx';
import agentMainAsset from '../../api/agent';
import {
  IGetMainAssetTracking,
  IMainAssetTrackingDetails,
  IMainAssetTrackingParam,
} from 'src/@types/foamCompanyTypes/systemTypes/MainAsset';
import {
  ILoanTracking,
  ILoanTrackingParams,
} from 'src/@types/foamCompanyTypes/systemTypes/LoanTracking';
import {
  IExpenseTracking,
  IExpenseTrackingParams,
} from 'src/@types/foamCompanyTypes/systemTypes/ExpenseTracking';
import {
  ITradeTracking,
  ITradeTrackingParams,
} from 'src/@types/foamCompanyTypes/systemTypes/TradeTracking';
import {
  IWithdrawalTracking,
  IWithdrawalTrackingParams,
} from 'src/@types/foamCompanyTypes/systemTypes/WithdrawalTracking';
export default class MainAssetDetailsStore {
  LoadMainAssetTracking: IGetMainAssetTracking[] = [];

  LoadLoanTracking: ILoanTracking[] = [];

  LoadExpenseTracking: IExpenseTracking[] = [];

  LoadTradeTracking: ITradeTracking[] = [];

  LoadWidthrawalTracking: IWithdrawalTracking[] = [];

  MainAssetDetail: IMainAssetTrackingDetails | undefined;

  constructor() {
    makeAutoObservable(this);
  }

  GetMainAssetTracking = async (params: IMainAssetTrackingParam) => {
    try {
      const result = await agentMainAsset.MainAsset.Gettracking(params);
      runInAction(() => {
        this.LoadMainAssetTracking = result.data.data;
      });
    } catch (error) {
      console.log(error);
    }
  };

  GetLoanTracking = async (params: ILoanTrackingParams) => {
    try {
      const result = await agentMainAsset.LoanTracking.getList(params);
      runInAction(() => {
        this.LoadLoanTracking = result.data.data;
      });
    } catch (error) {
      console.log(error);
    }
  };

  loadExpenseTracking = async (params: IExpenseTrackingParams) => {
    try {
      const result = await agentMainAsset.ExpenseTracking.getList(params);
      runInAction(() => {
        this.LoadExpenseTracking = result.data.data;
      });
    } catch (error) {
      console.log(error);
    }
  };

  loadTradeTracking = async (params: ITradeTrackingParams) => {
    try {
      const result = await agentMainAsset.TradeTracking.getList(params);
      runInAction(() => {
        this.LoadTradeTracking = result.data.data;
      });
    } catch (error) {
      console.log(error);
    }
  };

  loadWithdrawalTracking = async (params: IWithdrawalTrackingParams) => {
    try {
      const result = await agentMainAsset.WithdrawalTracking.getList(params);
      runInAction(() => {
        this.LoadWidthrawalTracking = result.data.data;
      });
    } catch (error) {
      console.log(error);
    }
  };

  loadMainAssetDetail = async (id: string) => {
    try {
      const axiosResponse = await agentMainAsset.MainAsset.detail(id);
      runInAction(() => {
        this.MainAssetDetail = axiosResponse;
      });
    } catch (error) {
      console.log(error);
    }
  };
}
