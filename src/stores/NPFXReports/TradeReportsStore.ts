import { makeAutoObservable } from 'mobx';

import agent from 'src/api/agent';
import {
  TradeStatisticalReportView,
  ITradeReportParam,
} from 'src/@types/foamCompanyTypes/TradeReports';

export default class TradeReportsStore {
  openDialog = false;

  openDialogReject = false;

  TradeStatisticalReportDetails: TradeStatisticalReportView | undefined;

  totalRecord: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  loadTradeStatisticalReport = async (params: ITradeReportParam) => {
    console.log(params);
    try {
      const result = await agent.NPFXReports.GetTradeReport(params);
      console.log(result);
      this.TradeStatisticalReportDetails = result.data;
    } catch (error) {
      console.log(error);
    }
  };
}
