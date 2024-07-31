import { makeAutoObservable } from 'mobx';

import agent from 'src/api/agent';
import {
  LoanStatisticalReportView,
  ILoanReportParam,
} from 'src/@types/foamCompanyTypes/LoanReports';

export default class LoanReportsStore {
  openDialog = false;

  openDialogReject = false;

  LoanStatisticalReportDetails: LoanStatisticalReportView | undefined;

  totalRecord: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  loadLoanStatisticalReport = async (params: ILoanReportParam) => {
    console.log(params);
    try {
      const result = await agent.NPFXReports.GetLoanReport(params);
      console.log(result);
      this.LoanStatisticalReportDetails = result.data;
    } catch (error) {
      console.log(error);
    }
  };
}
