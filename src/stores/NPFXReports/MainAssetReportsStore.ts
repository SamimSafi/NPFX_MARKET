import { makeAutoObservable } from 'mobx';

import agent from 'src/api/agent';
import {
  MainAssetReportView,
  IMainAssetReportParam,
} from 'src/@types/foamCompanyTypes/MainAssetReports';

export default class MainAssetReportsStore {
  openDialog = false;

  openDialogReject = false;

  MainAssetStatisticalReportDetails: MainAssetReportView | undefined;

  totalRecord: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  loadMainAssetStatisticalReport = async (params: IMainAssetReportParam) => {
 
    try {
      const result = await agent.NPFXReports.GetMainAssetReport(params);
      this.MainAssetStatisticalReportDetails = result.data;
    
    } catch (error) {
      console.log(error);
    }
  };
}
