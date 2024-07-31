import { makeAutoObservable } from 'mobx';

import agent from 'src/api/agent';
import {
  ExpenseStatisticalReportView,
  IExpenseReportParam,
} from 'src/@types/foamCompanyTypes/ExpenseReports';

export default class ExpenseReportsStore {
  openDialog = false;

  openDialogReject = false;

  ExpenseStatisticalReportDetails: ExpenseStatisticalReportView | undefined;

  totalRecord: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  loadExpenseStatisticalReport = async (params: IExpenseReportParam) => {
    console.log(params);
    try {
      const result = await agent.NPFXReports.GetExpenseReport(params);
      console.log(result);
      this.ExpenseStatisticalReportDetails = result.data;
    } catch (error) {
      console.log(error);
    }
  };
}
