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
 
    try {
      const result = await agent.NPFXReports.GetExpenseReport(params);
      this.ExpenseStatisticalReportDetails = result.data;
    
    } catch (error) {
      console.log(error);
    }
  };
}
